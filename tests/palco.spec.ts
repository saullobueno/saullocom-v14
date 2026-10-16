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

  test('pontos de cena no celular: visiveis, dentro da tela e sem tocar no texto', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await abrir(page);
    await girarRoda(page, 40);
    const pontos = page.locator('.pontos .ponto');
    await expect(page.locator('.pontos')).toBeVisible();
    expect(
      await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth),
    ).toBe('none');
    // a coluna fica dentro da tela e a direita do conteudo da cena
    const medidas = await page.evaluate(() => {
      const col = document.querySelector('.pontos')!.getBoundingClientRect();
      const itens = [...document.querySelectorAll('main .cena[data-estado="ativa"] .cena-caixa *')]
        .filter((el) => el.children.length === 0 && el.textContent?.trim())
        .map((el) => el.getBoundingClientRect().right);
      return { colEsq: col.left, colDir: col.right, textoMaxDir: Math.max(...itens) };
    });
    expect(medidas.colDir).toBeLessThanOrEqual(390);
    expect(medidas.textoMaxDir).toBeLessThanOrEqual(medidas.colEsq);
    // cada ponto tem area de toque de pelo menos 24x24 (WCAG 2.2, 2.5.8)
    for (const caixa of await pontos.evaluateAll((els) =>
      els.map((el) => el.getBoundingClientRect().toJSON() as DOMRect),
    )) {
      expect(caixa.width).toBeGreaterThanOrEqual(24);
      expect(caixa.height).toBeGreaterThanOrEqual(24);
    }
    // tocar num ponto leva a cena
    await pontos.nth(6).click();
    await page.waitForTimeout(TRANSICAO);
    expect(await cenaAtiva(page)).toBe(5);
  });

  for (const [nome, largura, altura] of [
    ['desktop 1440', 1440, 900],
    ['notebook 1280', 1280, 720],
    ['tablet 1024', 1024, 768],
    ['tablet 900', 900, 800],
  ] as const) {
    test(`${nome}: a coluna de pontos nao cobre o texto da cena`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await abrir(page);
      for (let n = 0; n < 6; n++) {
        await girarRoda(page, 40);
        // espera todas as transicoes terminarem (entradas escalonadas)
        await page.evaluate(() =>
          Promise.all(
            document
              .getAnimations()
              .filter((a) => a instanceof CSSTransition)
              .map((a) => a.finished),
          ),
        );
        const m = await page.evaluate(() => {
          const col = document.querySelector('.pontos')!.getBoundingClientRect();
          const direitas = [
            ...document.querySelectorAll('main .cena[data-estado="ativa"] .cena-caixa *'),
          ]
            .filter((el) => el.children.length === 0 && el.textContent?.trim())
            .map((el) => el.getBoundingClientRect().right);
          return { esq: col.left, texto: Math.max(...direitas) };
        });
        expect(m.texto, `cena ${n}`).toBeLessThanOrEqual(m.esq);
      }
    });
  }

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
