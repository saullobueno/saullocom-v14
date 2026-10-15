import { expect, test, type Page } from '@playwright/test';

const TRANSICAO = 1300; // trava do gesto (800ms) + transicoes da cena

const estados = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>('main .cena')].map((c) => c.dataset.estado),
  );

const cenaAtiva = async (page: Page) => (await estados(page)).indexOf('ativa');

// um gesto da roda do mouse, bem pequeno de proposito: qualquer quantidade avanca uma cena
async function girarRoda(page: Page, delta: number) {
  await page.mouse.wheel(0, delta);
  await page.waitForTimeout(TRANSICAO);
}

async function abrir(page: Page, caminho = '/') {
  await page.goto(caminho, { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('data-palco', '');
  await page.mouse.move(300, 300);
}

test.describe('palco (movimento normal)', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('no topo so o hero aparece, fixo e do tamanho da tela', async ({ page }) => {
    await abrir(page);
    const hero = await page.locator('#top').evaluate((el) => {
      const r = el.getBoundingClientRect();
      return { position: getComputedStyle(el).position, w: r.width, h: r.height };
    });
    expect(hero).toEqual({ position: 'fixed', w: 1280, h: 720 });
    expect(await page.locator('.painel').evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeHidden();
  });

  test('um gesto minimo de rolagem revela a proxima cena, com a caixa escura embacada', async ({
    page,
  }) => {
    await abrir(page);
    await girarRoda(page, 20);
    expect(await cenaAtiva(page)).toBe(0);
    expect(await page.evaluate(() => scrollY)).toBe(720);

    const painel = await page.locator('.painel').evaluate((el) => {
      const s = getComputedStyle(el);
      return { opacity: s.opacity, blur: s.backdropFilter, fundo: s.backgroundColor };
    });
    expect(painel.opacity).toBe('1');
    expect(painel.blur).toContain('blur');
    expect(painel.fundo).toMatch(/rgba\(.*0\.\d+\)/); // escuro e translucido
    // o hero continua fixo atras
    expect(await page.locator('#top').evaluate((el) => el.getBoundingClientRect().top)).toBe(0);
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  });

  test('rolar varias vezes seguidas nao pula cenas; para cima volta', async ({ page }) => {
    await abrir(page);
    await girarRoda(page, 20);
    // rajada (como a inercia do trackpad): conta como um unico gesto
    await page.evaluate(async () => {
      for (let i = 0; i < 12; i++) {
        document.body.dispatchEvent(
          new WheelEvent('wheel', { deltaY: 30, bubbles: true, cancelable: true }),
        );
        await new Promise((r) => setTimeout(r, 16));
      }
    });
    await page.waitForTimeout(TRANSICAO);
    expect(await cenaAtiva(page)).toBe(1);
    await girarRoda(page, 300);
    expect(await cenaAtiva(page)).toBe(2);
    await girarRoda(page, -20);
    expect(await cenaAtiva(page)).toBe(1);
    await girarRoda(page, -20);
    await girarRoda(page, -20);
    expect(await page.locator('.painel').evaluate((el) => getComputedStyle(el).opacity)).toBe('0');
  });

  test('so a cena ativa aparece: nada das outras fica visivel, nem um pixel', async ({ page }) => {
    await abrir(page);
    for (let n = 0; n < 4; n++) {
      await girarRoda(page, 40);
      const vazamentos = await page.evaluate(() => {
        const ruins: string[] = [];
        for (const cena of document.querySelectorAll<HTMLElement>('main .cena')) {
          if (cena.dataset.estado === 'ativa') continue;
          const caixa = cena.querySelector('.cena-caixa')!;
          if (getComputedStyle(caixa).opacity !== '0')
            ruins.push(`caixa de ${cena.parentElement?.id}`);
          for (const el of cena.querySelectorAll('[class*="rv-"]')) {
            if (el.classList.contains('rv-rise') || el.classList.contains('rv-mask')) continue; // palavras do titulo: cobertas pela caixa
            if (getComputedStyle(el).opacity !== '0') ruins.push(String(el.className));
          }
        }
        return ruins;
      });
      expect(vazamentos).toEqual([]);
    }
  });

  test('os elementos da cena ativa ficam todos visiveis', async ({ page }) => {
    await abrir(page);
    // ate a cena de um projeto (muitas tags e destaques)
    for (let n = 0; n < 5; n++) await girarRoda(page, 40);
    await page.waitForTimeout(800);
    const invisiveis = await page.evaluate(() =>
      [...document.querySelectorAll('main .cena[data-estado="ativa"] [class*="rv-"]')]
        .filter((el) => getComputedStyle(el).opacity !== '1')
        .map((el) => String(el.className)),
    );
    expect(invisiveis).toEqual([]);
  });

  test('teclado: PageDown, PageUp, End e Home', async ({ page }) => {
    await abrir(page);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(TRANSICAO);
    expect(await cenaAtiva(page)).toBe(0);
    await page.keyboard.press('End');
    await page.waitForTimeout(TRANSICAO);
    const total = (await estados(page)).length;
    expect(await cenaAtiva(page)).toBe(total - 1);
    await page.keyboard.press('Home');
    await page.waitForTimeout(TRANSICAO);
    expect(await page.evaluate(() => scrollY)).toBe(0);
  });

  test('o menu leva a primeira cena da secao', async ({ page }) => {
    await abrir(page);
    await girarRoda(page, 20);
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Projetos' })
      .click();
    await page.waitForTimeout(2000);
    await expect(page.locator('#portfolio-title')).toBeInViewport();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.querySelector('#portfolio .rv-up')!).opacity,
      ),
    ).toBe('1');
    await expect(
      page.getByRole('navigation').getByRole('link', { name: 'Projetos' }),
    ).toHaveAttribute('aria-current', 'location');
  });

  test('o rodape e uma linha pequena: autoria a esquerda, copyright a direita', async ({
    page,
  }) => {
    await abrir(page);
    const c = await page.locator('footer.copyright').evaluate((el) => {
      const r = el.getBoundingClientRect();
      return {
        position: getComputedStyle(el).position,
        direita: innerWidth - r.right,
        baixo: innerHeight - r.bottom,
      };
    });
    expect(c.position).toBe('fixed');
    expect(c.direita).toBeGreaterThan(24); // folga da barra de rolagem
    expect(c.direita).toBeLessThan(60);
    expect(c.baixo).toBeLessThan(40);
    const autoria = page.getByText('Design e código 100% autorais');
    await expect(autoria).toBeVisible();
    expect((await autoria.boundingBox())!.x).toBeLessThan(24); // extrema esquerda
    const copy = (await page.getByText(/Todos os direitos reservados/).boundingBox())!;
    expect(copy.x + copy.width).toBeGreaterThan(1280 - 60);
  });

  test('telas largas: sem barra de vidro (os pontos de cena a substituem)', async ({ page }) => {
    await abrir(page);
    await expect(page.locator('.barra-vidro')).toBeHidden();
    await expect(page.locator('.pontos')).toBeVisible();
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth),
    ).toBe('none');
  });

  test('telas pequenas: a barra de vidro acompanha a cena e leva a cena ao clicar', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await abrir(page);
    const barra = page.locator('.barra-vidro');
    const estilo = await barra.evaluate((el) => {
      const s = getComputedStyle(el);
      return {
        blur: s.backdropFilter,
        fundo: s.backgroundColor,
        nativa: getComputedStyle(document.documentElement).scrollbarWidth,
      };
    });
    expect(estilo.blur).toContain('blur');
    expect(estilo.fundo).toMatch(/rgba\(.*0\.\d+\)/); // translucida
    expect(estilo.nativa).toBe('none');
    await girarRoda(page, 40);
    await girarRoda(page, 40);
    const topo = () =>
      page.locator('.barra-polegar').evaluate((el) => el.getBoundingClientRect().top);
    const t1 = await topo();
    await girarRoda(page, 40);
    expect(await topo()).toBeGreaterThan(t1);
    // clicar perto do fim do trilho leva a uma das ultimas cenas
    const caixa = (await barra.boundingBox())!;
    await page.mouse.click(caixa.x + caixa.width / 2, caixa.y + caixa.height * 0.95);
    await page.waitForTimeout(TRANSICAO);
    const total = (await estados(page)).length;
    expect(await cenaAtiva(page)).toBeGreaterThanOrEqual(total - 2);
  });

  test('pontos de cena: um por cena, marcam a atual e levam a cena ao clicar', async ({ page }) => {
    await abrir(page);
    const total = (await estados(page)).length;
    const pontos = page.locator('.pontos .ponto');
    await expect(pontos).toHaveCount(total + 1); // as cenas e o hero
    await expect(pontos.first()).toHaveAttribute('aria-current', 'true');
    await girarRoda(page, 40);
    await expect(pontos.nth(1)).toHaveAttribute('aria-current', 'true');
    // so o primeiro ponto de cada secao e grande: hero + 5 secoes
    await expect(page.locator('.pontos .ponto-grande')).toHaveCount(6);
    await pontos.nth(4).click();
    await page.waitForTimeout(TRANSICAO);
    expect(await cenaAtiva(page)).toBe(3);
    await expect(pontos.nth(4)).toHaveAttribute('aria-current', 'true');
    // rotulo ao passar o mouse
    await pontos.nth(5).hover();
    expect(await pontos.nth(5).evaluate((el) => getComputedStyle(el, '::after').content)).toContain(
      'Forge',
    );
  });

  test('pontos de cena ficam escondidos em tela pequena', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await abrir(page);
    await expect(page.locator('.pontos')).toBeHidden();
  });

  for (const [nome, largura, altura] of [
    ['desktop', 1440, 900],
    ['tablet', 768, 1024],
    ['mobile', 390, 844],
    ['mobile pequeno', 360, 640],
  ] as const) {
    test(`${nome}: o conteudo cabe na caixa em todas as cenas e nao ha rolagem horizontal`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await abrir(page);
      const total = (await estados(page)).length;
      for (let n = 0; n < total; n++) {
        await girarRoda(page, 40);
        const medida = await page.evaluate(() => {
          const caixa = document.querySelector<HTMLElement>(
            'main .cena[data-estado="ativa"] .cena-caixa',
          )!;
          return {
            sobra: caixa.scrollHeight - caixa.clientHeight,
            id: caixa.closest('section')?.id,
          };
        });
        expect(medida.sobra, `cena ${n} (${medida.id})`).toBeLessThanOrEqual(1);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ),
      ).toBe(0);
    });
  }

  test('tela muito baixa (celular deitado): pagina comum, sem palco', async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 390 });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).not.toHaveAttribute('data-palco', '');
    await expect(page.getByRole('heading', { name: 'SOBRE' })).toBeVisible();
  });
});

test.describe('sem palco (movimento reduzido)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('pagina comum: nada escondido, deslocado ou recortado', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).not.toHaveAttribute('data-palco', '');
    const estado = await page.evaluate(() =>
      [...document.querySelectorAll('[class*="rv-"]')]
        .filter((e) => !e.classList.contains('rv-mask'))
        .map((e) => {
          const s = getComputedStyle(e);
          return {
            classe: e.className.toString(),
            opacity: s.opacity,
            translate: s.translate,
            scale: s.scale,
            clip: s.clipPath,
          };
        })
        .filter(
          (e) =>
            e.opacity !== '1' || e.translate !== 'none' || e.scale !== 'none' || e.clip !== 'none',
        ),
    );
    expect(estado).toEqual([]);
    expect(await page.locator('#top').evaluate((el) => getComputedStyle(el).position)).not.toBe(
      'fixed',
    );
  });
});
