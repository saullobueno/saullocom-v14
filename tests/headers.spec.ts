import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { esperaHidratar } from './hidratacao';

// Aplica os cabecalhos de vercel.json (como a Vercel faria) e garante que a CSP nao bloqueia nada.
const config = JSON.parse(readFileSync('vercel.json', 'utf8')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const globais = Object.fromEntries(
  config.headers.find((h) => h.source === '/(.*)')!.headers.map(({ key, value }) => [key, value]),
);

test('HTML gerado tem CSP por hash para os scripts inline, sem unsafe-inline', async ({ page }) => {
  for (const caminho of ['/', '/en', '/pagina-que-nao-existe']) {
    await page.goto(caminho);
    const csp = await page
      .locator('meta[http-equiv="Content-Security-Policy"]')
      .getAttribute('content');
    expect(csp, caminho).toMatch(/^script-src 'self'( 'sha256-[A-Za-z0-9+/=]+')+$/);
  }
  expect(globais['Strict-Transport-Security']).toMatch(/max-age=\d{8,}/);
});

test('CSP do vercel.json nao bloqueia recursos nem os lightboxes', async ({ page }) => {
  await page.route('**/*', async (route) => {
    try {
      const resposta = await route.fetch();
      await route.fulfill({ response: resposta, headers: { ...resposta.headers(), ...globais } });
    } catch {
      // requisicao cancelada ao fechar a pagina
    }
  });
  await page.addInitScript(() => {
    (window as unknown as { __csp: string[] }).__csp = [];
    document.addEventListener('securitypolicyviolation', (e) =>
      (window as unknown as { __csp: string[] }).__csp.push(
        `${e.violatedDirective}: ${e.blockedURI}`,
      ),
    );
  });

  await page.goto('/');
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 800) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
  });

  // lightbox dos projetos em destaque
  const destaque = page.getByRole('link', { name: /Ampliar imagem principal de Forge/ });
  await destaque.scrollIntoViewIfNeeded();
  await esperaHidratar(destaque);
  await destaque.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');

  // lightbox dos projetos legados
  const legado = page.getByRole('link', { name: /^Ampliar projeto/ }).first();
  await legado.scrollIntoViewIfNeeded();
  await esperaHidratar(legado);
  await legado.click();
  await expect(page.getByRole('dialog')).toBeVisible();

  const violacoes = await page.evaluate(() => (window as unknown as { __csp: string[] }).__csp);
  expect(violacoes).toEqual([]);
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});
