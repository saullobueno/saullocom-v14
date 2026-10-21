import { expect, test } from '@playwright/test';
import { esperaHidratar } from './hidratacao';

// Sem JavaScript (bloqueador de scripts, politica da empresa...) o site e uma pagina comum:
// conteudo, menu e idioma continuam funcionando; so some o que depende de script.
test.describe('sem JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('o menu fica visivel e leva as secoes', async ({ page }) => {
    await page.goto('/');
    const menu = page.getByRole('navigation', { name: 'Navegação principal' });
    await expect(menu).toBeVisible();
    await menu.getByRole('link', { name: 'Contatos' }).click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('as capturas sao links para a imagem cheia e os controles sem uso somem', async ({
    page,
  }) => {
    await page.goto('/');
    const principal = page.getByRole('link', { name: /Ampliar imagem principal de Forge/ });
    await expect(principal).toHaveAttribute('href', /\.avif$/);
    await expect(principal).toHaveAttribute('target', '_blank');
    await expect(page.getByRole('link', { name: /Ampliar captura 2 de Forge/ })).toHaveAttribute(
      'href',
      /\.avif$/,
    );
    await expect(page.getByRole('link', { name: /^Ampliar projeto/ }).first()).toHaveAttribute(
      'href',
      /portfolio-web-.+-g-.+\.avif$/,
    );
    // setas da galeria e "ver todos" dependem de script: nao aparecem
    await expect(page.locator('.precisa-js:visible')).toHaveCount(0);

    await principal.scrollIntoViewIfNeeded();
    const [aba] = await Promise.all([page.waitForEvent('popup'), principal.click()]);
    expect(aba.url()).toMatch(/\.avif$/);
  });

  test('o seletor de idioma funciona (details nativo)', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Idioma').click();
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('heading', { name: 'ABOUT' })).toBeVisible();
  });
});

test.describe('com JavaScript', () => {
  test('o bloco noscript nao muda nada: a barra segue escondida no topo, sem avisos', async ({
    page,
  }) => {
    const avisos: string[] = [];
    page.on('console', (m) => {
      if (['error', 'warning'].includes(m.type())) avisos.push(m.text());
    });
    await page.goto('/', { waitUntil: 'networkidle' });
    await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeHidden();
    expect(avisos).toEqual([]);
  });

  test('imagem ampliavel: clique abre o lightbox; Ctrl+clique abre a imagem em outra aba', async ({
    page,
    context,
  }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const principal = page.getByRole('link', { name: /Ampliar imagem principal de Forge/ });
    await principal.scrollIntoViewIfNeeded();
    await esperaHidratar(principal);
    await principal.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toBeHidden();

    const [aba] = await Promise.all([
      context.waitForEvent('page'),
      principal.click({ modifiers: ['Control'] }),
    ]);
    expect(aba.url()).toMatch(/\.avif$/);
    await expect(page.getByRole('dialog')).toBeHidden();
  });
});
