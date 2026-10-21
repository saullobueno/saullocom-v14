import { expect, test, type Page } from '@playwright/test';

// O componente Desempenho mede os quadros por segundo. Para o teste nao depender da velocidade da
// maquina que o roda, o requestAnimationFrame e trocado por um com ritmo conhecido:
// 16ms (~60 fps) ou 120ms (~8 fps). `lentoComCena` fica lento so depois que uma cena abre.
async function fingeQuadros(page: Page, ritmo: 'rapido' | 'lento' | 'lentoComCena') {
  await page.addInitScript((modo) => {
    window.requestAnimationFrame = (cb) =>
      window.setTimeout(
        () => cb(performance.now()),
        modo === 'lento' ||
          (modo === 'lentoComCena' && document.documentElement.hasAttribute('data-rolou'))
          ? 120
          : 16,
      );
  }, ritmo);
}

const animacaoDoHero = (page: Page) =>
  page.locator('#top').evaluate((el) => getComputedStyle(el).animationName);

test.describe('desempenho adaptativo', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('maquina lenta: desliga a animacao de cor do hero e lembra na sessao', async ({ page }) => {
    await fingeQuadros(page, 'lento');
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(await animacaoDoHero(page)).toBe('hue-rotate');
    await expect(page.locator('html')).toHaveAttribute('data-leve', '', { timeout: 10_000 });
    expect(await animacaoDoHero(page)).toBe('none');

    // a decisao vale para a sessao: ao recarregar, a pagina ja nasce sem a animacao
    await page.reload({ waitUntil: 'commit' });
    await page.waitForSelector('#top', { state: 'attached' });
    await expect(page.locator('html')).toHaveAttribute('data-leve', '');
  });

  test('maquina normal: a animacao de cor continua', async ({ page }) => {
    await fingeQuadros(page, 'rapido');
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(4000); // mais que a espera + a amostra
    await expect(page.locator('html')).not.toHaveAttribute('data-leve', '');
    expect(await animacaoDoHero(page)).toBe('hue-rotate');
  });

  test('rapida no hero, lenta quando a cena abre (painel com blur): desliga a animacao', async ({
    page,
  }) => {
    await fingeQuadros(page, 'lentoComCena');
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveAttribute('data-palco', '');
    await expect(page.locator('.pontos .ponto').first()).toBeAttached();
    await page.waitForTimeout(3000); // a primeira medida (no hero) termina sem desligar nada
    await expect(page.locator('html')).not.toHaveAttribute('data-leve', '');
    await page.keyboard.press('PageDown');
    // folga grande: o Firefox sem GPU leva 15 a 25 s so para esta pagina (a medida em si leva ~4 s)
    await expect(page.locator('html')).toHaveAttribute('data-leve', '', { timeout: 30_000 });
  });

  test('aba em segundo plano nao conta como maquina lenta', async ({ page }) => {
    await fingeQuadros(page, 'lento'); // sem a protecao, a medida lenta desligaria a animacao
    await page.addInitScript(() => {
      // o navegador pausa os quadros em segundo plano: a medida tem de ser descartada
      Object.defineProperty(document, 'visibilityState', { get: () => 'hidden' });
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3500);
    await expect(page.locator('html')).not.toHaveAttribute('data-leve', '');
  });
});

test.describe('desempenho adaptativo com menos movimento', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nao ha animacao para desligar, entao nem mede', async ({ page }) => {
    await fingeQuadros(page, 'lento');
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(3500);
    await expect(page.locator('html')).not.toHaveAttribute('data-leve', '');
  });
});
