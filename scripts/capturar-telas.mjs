// Captura screenshots da pagina (build servido por "vite preview") para comparar regressoes visuais.
// Uso: node scripts/capturar-telas.mjs <pasta-de-saida> [url]
import { chromium } from '@playwright/test';
import fs from 'node:fs';

const saida = process.argv[2] ?? 'tmp-telas';
const url = process.argv[3] ?? 'http://localhost:4173/';
fs.mkdirSync(saida, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
for (const [nome, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  // rola ate o fim para disparar o lazy loading
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${saida}/${nome}.png`, fullPage: true });
  console.log(nome, await page.evaluate(() => `${document.documentElement.scrollWidth}x${document.documentElement.scrollHeight}`));
  await ctx.close();
}
await browser.close();
