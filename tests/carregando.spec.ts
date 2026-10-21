import { expect, test, type Page } from '@playwright/test';

const estilo = (page: Page, seletor: string, propriedade: string) =>
  page.locator(seletor).evaluate((el, p) => getComputedStyle(el).getPropertyValue(p), propriedade);

const scrollY = (page: Page) => page.evaluate(() => Math.round(window.scrollY));
const cenasAtivas = (page: Page) => page.locator('main .cena[data-estado="ativa"]').count();

async function abrir(page: Page) {
  await page.goto('/', { waitUntil: 'networkidle' });
  // data-pronto: o Palco registrou os ouvintes (a rolagem responde)
  await expect(page.locator('html')).toHaveAttribute('data-pronto', '');
}

// O script do React (entry.client) e o que liga o palco: segurar ou derrubar esse arquivo reproduz
// os primeiros segundos de um celular lento
const segurarReact = (page: Page, ms: number) =>
  page.route(/entry\.client-.*\.js/, async (rota) => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    await rota.continue();
  });
const derrubarReact = (page: Page) => page.route(/entry\.client-.*\.js/, (rota) => rota.abort());

test.describe('carregando e dica de rolagem (modo palco)', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('pronto: o icone de rolagem aparece abaixo da logo; spinner e barra somem', async ({
    page,
  }) => {
    await abrir(page);
    await expect.poll(() => estilo(page, '.rolar-icone', 'opacity')).toBe('1');
    expect(await estilo(page, '.rolar-carregando', 'visibility')).toBe('hidden');
    expect(await estilo(page, '.carregando', 'display')).toBe('none');
    const abaixoDaLogoComFolga = await page.evaluate(() => {
      const logo = document.querySelector('.hero-conteudo img')!.getBoundingClientRect();
      const d = document.querySelector('.rolar-dica')!.getBoundingClientRect();
      return d.top - logo.bottom >= 40 && d.left < logo.right && d.right > logo.left;
    });
    expect(abaixoDaLogoComFolga).toBe(true);
  });

  test('abrir uma cena esconde a dica', async ({ page }) => {
    await abrir(page);
    await page.keyboard.press('PageDown');
    await expect.poll(() => estilo(page, '.rolar-dica', 'visibility')).toBe('hidden');
  });

  test('antes do React hidratar: spinner e barra no lugar do icone, e a rolagem travada', async ({
    page,
  }) => {
    await derrubarReact(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-palco', '');
    await expect(page.locator('html')).not.toHaveAttribute('data-pronto', '');
    expect(await estilo(page, '.carregando', 'display')).toBe('block');
    expect(await estilo(page, '.rolar-carregando', 'visibility')).toBe('visible');
    expect(await estilo(page, '.rolar-icone', 'visibility')).toBe('hidden');

    await page.mouse.move(300, 300);
    await page.mouse.wheel(0, 1500);
    for (const tecla of ['PageDown', 'ArrowDown', 'Space', 'End']) await page.keyboard.press(tecla);
    await page.waitForTimeout(800);
    expect(await scrollY(page)).toBe(0);
  });

  test('rolar enquanto a pagina carrega nao leva a cena nenhuma quando ela fica pronta', async ({
    page,
  }) => {
    await segurarReact(page, 3000);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).not.toHaveAttribute('data-pronto', '');
    await page.mouse.move(300, 300);
    // visitante impaciente: duas rolagens e uma tecla durante a espera
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(300);
    await page.mouse.wheel(0, 900);
    await page.keyboard.press('PageDown');
    await expect(page.locator('html')).toHaveAttribute('data-pronto', '', { timeout: 30_000 });
    await page.waitForTimeout(1500);
    expect(await scrollY(page)).toBe(0);
    expect(await cenasAtivas(page)).toBe(0);
    await expect(page.locator('html')).not.toHaveAttribute('data-rolou', '');
    // e a rolagem funciona normalmente depois: uma cena por gesto
    await page.mouse.wheel(0, 40);
    await expect.poll(() => cenasAtivas(page), { timeout: 10_000 }).toBe(1);
    await expect(page.locator('html')).toHaveAttribute('data-rolou', '');
  });

  test('se o React nao chega, em 25 s o palco desliga e a pagina vira um fluxo comum', async ({
    page,
  }) => {
    await page.clock.install();
    await derrubarReact(page);
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-palco', '');
    await page.clock.fastForward(26_000);
    await expect(page.locator('html')).not.toHaveAttribute('data-palco', '');
    // texto visivel (sem palco nada fica escondido) e rolagem livre
    await expect(page.locator('#about-title')).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 1500));
    expect(await scrollY(page)).toBeGreaterThan(1000);
  });

  for (const [nome, largura, altura] of [
    ['celular 360x640', 360, 640],
    ['celular 375x667', 375, 667],
  ] as const) {
    test(`${nome}: tela baixa, sem o indicador (so a barra do topo)`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await abrir(page);
      expect(await estilo(page, '.rolar-dica', 'display')).toBe('none');
    });
  }

  for (const [nome, largura, altura] of [
    ['celular 360x700', 360, 700],
    ['celular 390x844', 390, 844],
    ['desktop 1440x900', 1440, 900],
  ] as const) {
    test(`${nome}: o indicador nao encosta nos textos do hero nem sai da tela`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await abrir(page);
      expect(await estilo(page, '.rolar-dica', 'display')).not.toBe('none');
      const medidas = await page.evaluate(() => {
        const d = document.querySelector('.rolar-dica')!.getBoundingClientRect();
        const textos = [
          ...document.querySelectorAll('.hero-conteudo p, .hero-conteudo [aria-hidden="true"]'),
        ]
          .filter((el) => !el.closest('.rolar-dica'))
          .map((el) => el.getBoundingClientRect());
        const encosta = textos.some(
          (t) => d.left < t.right && d.right > t.left && d.top < t.bottom && d.bottom > t.top,
        );
        return { encosta, dentro: d.bottom <= innerHeight && d.top >= 0 };
      });
      expect(medidas).toEqual({ encosta: false, dentro: true });
    });
  }
});

test.describe('dica de rolagem sem o modo palco (menos movimento)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('so o icone de rolagem, sem spinner e sem barra de carregamento', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).not.toHaveAttribute('data-palco', '');
    await expect(page.locator('.rolar-icone')).toBeVisible();
    expect(await estilo(page, '.rolar-carregando', 'visibility')).toBe('hidden');
    expect(await estilo(page, '.carregando', 'display')).toBe('none');
  });
});
