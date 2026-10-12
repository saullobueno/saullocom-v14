import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('idiomas', () => {
  test('/en tem lang, titulo, canonical e hreflang corretos', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('h1')).toHaveText('Full Stack Developer');
    await expect(page).toHaveTitle(/Full Stack Developer & UI\/UX Designer/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://saullo.com/en',
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'en_US');
  });

  for (const caminho of ['/', '/en']) {
    test(`${caminho} declara as alternativas pt-BR, en e x-default`, async ({ page }) => {
      await page.goto(caminho);
      await expect(page.locator('link[rel="alternate"][hreflang="pt-BR"]')).toHaveAttribute(
        'href',
        'https://saullo.com/',
      );
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute(
        'href',
        'https://saullo.com/en',
      );
      await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute(
        'href',
        'https://saullo.com/',
      );
    });
  }

  test('seletor de idioma alterna entre / e /en', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Read this site in English' }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('heading', { name: 'MY STORY' })).toBeVisible();
    await page.getByRole('link', { name: 'Ler este site em português' }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole('heading', { name: 'MINHA TRAJETÓRIA' })).toBeVisible();
  });

  test('/en sem JavaScript traz o conteudo em ingles', async ({ browser }) => {
    const contexto = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexto.newPage();
    await page.goto('/en');
    await expect(page.getByRole('heading', { name: 'WHAT I DO' })).toBeVisible();
    await expect(page.getByText('AI Software Factory')).toBeVisible();
    await contexto.close();
  });

  test('/en passa no axe WCAG A/AA e nao tem rolagem horizontal no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBe(0);
    const resultado = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    expect(resultado.violations.map((v) => `${v.id}: ${v.nodes.length}`)).toEqual([]);
  });
});

test.describe('navegacao', () => {
  test('links do menu levam as secoes e marcam a ativa', async ({ page }) => {
    await page.goto('/');
    await page
      .getByRole('navigation', { name: 'Navegação principal' })
      .getByRole('link', { name: 'Portfólio' })
      .click();
    await expect(page.locator('#portfolio')).toBeInViewport();
    await expect(
      page.getByRole('navigation').getByRole('link', { name: 'Portfólio' }),
    ).toHaveAttribute('aria-current', 'location');
  });

  test('CTA leva ao contato', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Vamos conversar' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('link "pular para o conteudo" aparece no foco e leva ao main', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const pular = page.getByRole('link', { name: 'Pular para o conteúdo' });
    await expect(pular).toBeFocused();
    await expect(pular).toBeVisible();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('menu mobile abre, navega e fecha', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByText('Menu', { exact: true }).or(page.locator('summary')).first().click();
    const contato = page.locator('details').getByRole('link', { name: 'Contato' });
    await expect(contato).toBeVisible();
    await contato.click();
    await expect(page.locator('#contact')).toBeInViewport();
    await expect(page.locator('details')).not.toHaveAttribute('open', '');
  });
});
