import { expect, type Locator } from '@playwright/test';

// Espera o React hidratar o elemento: ele guarda as props (inclusive o onClick) no proprio elemento.
// Antes disso, um link de imagem segue o href (abre a imagem em outra aba) em vez de abrir o
// lightbox, e o `networkidle` do goto nao garante que a hidratacao ja terminou.
export const esperaHidratar = (elemento: Locator) =>
  expect
    .poll(() =>
      elemento.evaluate((el) => Object.keys(el).some((chave) => chave.startsWith('__reactProps'))),
    )
    .toBe(true);
