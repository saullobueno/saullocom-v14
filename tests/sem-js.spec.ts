import { expect, test } from '@playwright/test';

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

  test('o seletor de idioma funciona (details nativo)', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Idioma').click();
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole('heading', { name: 'ABOUT' })).toBeVisible();
  });
});

test.describe('com JavaScript', () => {
  test.use({ reducedMotion: 'no-preference' });

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
});
