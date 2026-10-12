import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('estrutura basica e SEO', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('h1')).toHaveText('Desenvolvedor Full Stack');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Full Stack/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /social\.jpg/);
});

for (const [nome, width, height] of [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
] as const) {
  test(`sem rolagem horizontal (${nome})`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
  });
}

test('acessibilidade WCAG A/AA (axe)', async ({ page }) => {
  await page.goto('/');
  const resultado = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const resumo = resultado.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length} nos`);
  expect(resumo).toEqual([]);
});

test('lightbox abre ao clicar na imagem de um projeto', async ({ page }) => {
  await page.goto('/');
  const imagem = page.getByRole('button', { name: /Ampliar imagem principal de Forge/ });
  await imagem.scrollIntoViewIfNeeded();
  await imagem.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('HTML pre-renderizado traz o conteudo sem JavaScript', async ({ browser }) => {
  const contexto = await browser.newContext({ javaScriptEnabled: false });
  const page = await contexto.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'MINHA TRAJETÓRIA' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Forge' })).toBeVisible();
  await contexto.close();
});

test('rota inexistente mostra a pagina 404', async ({ page }) => {
  await page.goto('/nao-existe');
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Voltar para o início' })).toBeVisible();
});
