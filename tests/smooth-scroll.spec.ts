import { expect, test } from '@playwright/test';

// posicoes de scroll amostradas a cada ~16ms apos um giro da roda do mouse
async function amostrarRoda(page: import('@playwright/test').Page, delta: number) {
  await page.mouse.move(640, 360);
  await page.evaluate(() => {
    (window as unknown as { __y: number[] }).__y = [];
    const lerY = () => {
      (window as unknown as { __y: number[] }).__y.push(Math.round(window.scrollY));
      requestAnimationFrame(lerY);
    };
    requestAnimationFrame(lerY);
  });
  await page.mouse.wheel(0, delta);
  await page.waitForTimeout(1500);
  return page.evaluate(() => (window as unknown as { __y: number[] }).__y);
}

test.describe('rolagem suave (movimento normal)', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('um giro da roda vira uma sequencia gradual, nao um salto', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.locator('html')).toHaveClass(/lenis/);

    const ys = await amostrarRoda(page, 300);
    const final = ys[ys.length - 1];
    const intermediarios = new Set(ys.filter((y) => y > 5 && y < final - 5));

    expect(final).toBeGreaterThan(250); // a pagina de fato rolou
    expect(intermediarios.size).toBeGreaterThanOrEqual(6); // passou por varias posicoes no caminho
    // monotonico: nunca volta para tras
    for (let i = 1; i < ys.length; i++) expect(ys[i]).toBeGreaterThanOrEqual(ys[i - 1]);
  });

  test('links de ancora rolam suavemente e param abaixo da barra fixa', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // no topo a barra esta escondida; ela aparece depois da primeira rolagem
    await page.mouse.move(640, 360);
    await page.mouse.wheel(0, 300);
    const cta = page.getByRole('link', { name: 'Vamos conversar' });
    await expect(cta).toBeVisible();
    await cta.click();
    await expect.poll(async () => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
    // espera a animacao terminar
    await page.waitForTimeout(1800);
    const topo = await page.evaluate(
      () => document.getElementById('contact')!.getBoundingClientRect().top,
    );
    expect(topo).toBeGreaterThanOrEqual(-5);
    expect(topo).toBeLessThanOrEqual(80); // logo abaixo da barra de 56px
  });

  test('a roda dentro do lightbox nao rola a pagina de fundo', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const imagem = page.getByRole('button', { name: /Ampliar imagem principal de Forge/ });
    await imagem.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
    await imagem.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const antes = await page.evaluate(() => window.scrollY);
    await page.mouse.move(640, 360);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(1200);
    const depois = await page.evaluate(() => window.scrollY);
    expect(Math.abs(depois - antes)).toBeLessThan(5);
  });
});

test.describe('rolagem nativa (movimento reduzido)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('o Lenis nao e ativado', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    await expect(page.locator('html')).not.toHaveClass(/lenis/);
  });
});
