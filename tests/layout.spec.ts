import { expect, test } from '@playwright/test';

for (const caminho of ['/', '/en']) {
  for (const [nome, largura, altura] of [
    ['desktop', 1280, 720],
    ['mobile', 390, 844],
  ] as const) {
    test(`${caminho} (${nome}): a altura da pagina nao muda ao carregar as imagens lazy`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await page.goto(caminho, { waitUntil: 'networkidle' });
      const altura0 = await page.evaluate(() => document.documentElement.scrollHeight);

      // rola tudo (scrollTo e instantaneo) para disparar o carregamento de todas as imagens
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
      });
      await page.waitForLoadState('networkidle');
      const altura1 = await page.evaluate(() => document.documentElement.scrollHeight);

      expect(Math.abs(altura1 - altura0)).toBeLessThanOrEqual(2);
    });
  }
}
