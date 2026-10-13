import { expect, test } from '@playwright/test';

const ehAnalytics = (url: string) => new URL(url).pathname.startsWith('/_vercel/insights');

test.describe('Vercel Web Analytics', () => {
  test('nao carrega em localhost (dev e testes)', async ({ page }) => {
    const requisicoes: string[] = [];
    page.on('request', (r) => ehAnalytics(r.url()) && requisicoes.push(r.url()));
    await page.goto('/');
    await page.waitForTimeout(1500);
    expect(requisicoes).toEqual([]);
  });

  test.describe('em um host de producao', () => {
    // producao.test aponta para o servidor local (ver launchOptions em playwright.config.ts)
    test('solicita o script de insights (mesma origem)', async ({ page }) => {
      const requisicoes: string[] = [];
      page.on('request', (r) => ehAnalytics(r.url()) && requisicoes.push(r.url()));
      await page.goto('http://producao.test:4173/');
      await expect.poll(() => requisicoes.length).toBeGreaterThan(0);
      expect(requisicoes[0]).toContain('producao.test:4173/_vercel/insights/');
    });
  });
});
