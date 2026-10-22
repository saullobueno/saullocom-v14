import { expect, test, type Page } from '@playwright/test';

const TRANSICAO = 1300; // trava do gesto (800ms) + transicoes da cena

// Registra, com horario, cada vez que uma cena vira a ativa e quais caixas de cena estao visiveis
// (opacidade), para achar cenas que acendem de relance ou pulos fora da ordem.
async function registrarCenas(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __cenas: { ativas: number[]; maxVisiveis: number } };
    w.__cenas = { ativas: [], maxVisiveis: 0 };
    const cenas = () => [...document.querySelectorAll<HTMLElement>('main .cena')];
    new MutationObserver((mudancas) => {
      for (const m of mudancas) {
        const el = m.target as HTMLElement;
        if (el.classList?.contains('cena') && el.dataset.estado === 'ativa') {
          w.__cenas.ativas.push(cenas().indexOf(el));
        }
      }
    }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-estado'] });
    setInterval(() => {
      // so depois de o palco estar pronto: antes (sem CSS ou sem palco) todas as cenas aparecem
      if (!document.documentElement.hasAttribute('data-pronto')) return;
      const visiveis = cenas().filter((c) => {
        const caixa = c.querySelector('.cena-caixa');
        return caixa && parseFloat(getComputedStyle(caixa).opacity) > 0.05;
      }).length;
      w.__cenas.maxVisiveis = Math.max(w.__cenas.maxVisiveis, visiveis);
    }, 25);
  });
}

const lerCenas = (page: Page) =>
  page.evaluate(
    () => (window as unknown as { __cenas: { ativas: number[]; maxVisiveis: number } }).__cenas,
  );

async function abrir(page: Page, caminho = '/') {
  await page.goto(caminho, { waitUntil: 'networkidle' });
  await expect(page.locator('html')).toHaveAttribute('data-pronto', '', { timeout: 30_000 });
  await page.mouse.move(400, 300);
}

test.describe('passagem de cenas', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('descer e subir, um gesto por vez: a ordem nunca pula e nunca ha 3 cenas visiveis', async ({
    page,
  }) => {
    await registrarCenas(page);
    await abrir(page);
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(TRANSICAO);
    }
    for (let i = 0; i < 5; i++) {
      await page.mouse.wheel(0, -100);
      await page.waitForTimeout(TRANSICAO);
    }
    const { ativas, maxVisiveis } = await lerCenas(page);
    expect(ativas).toEqual([0, 1, 2, 3, 4, 3, 2, 1, 0]);
    expect(maxVisiveis).toBeLessThanOrEqual(2); // a que sai e a que entra, durante a troca
  });

  test('recarregar no meio da pagina leva direto a cena em que estava, sem passar por outras', async ({
    page,
    browserName,
  }) => {
    test.setTimeout(120_000);
    await registrarCenas(page);
    await abrir(page);
    // vai para a cena 5 (o ponto 0 e o hero)
    await page.locator('.pontos .ponto').nth(6).click();
    await page.waitForTimeout(TRANSICAO + 500);
    expect((await lerCenas(page)).ativas.at(-1)).toBe(5);

    if (browserName === 'chromium') {
      // CPU lenta: a hidratacao demora e o intervalo entre posicao restaurada e palco aumenta
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    }
    // varias vezes: quando o defeito existia, aparecia em ~1 de cada 3 recarregamentos
    for (let i = 0; i < 3; i++) {
      await page.reload({ waitUntil: 'commit' });
      await expect(page.locator('html')).toHaveAttribute('data-pronto', '', { timeout: 60_000 });
      await page.waitForTimeout(2000);
      const { ativas } = await lerCenas(page);
      expect(new Set(ativas), `recarregamento ${i + 1}`).toEqual(new Set([5]));
    }
  });
});

test.describe('hero em telas comuns de notebook', () => {
  test.use({ reducedMotion: 'no-preference' });

  for (const [largura, altura] of [
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1536, 864],
  ] as const) {
    test(`${largura}x${altura}: o titulo e a tagline cabem na tela, acima do rodape`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await abrir(page);
      const medidas = await page.evaluate(() => {
        const tagline = [...document.querySelectorAll('.hero-conteudo p')].pop()!;
        const rodape = document.querySelector('footer.copyright')!.getBoundingClientRect();
        const saudacao = document.querySelector('.hero-conteudo p')!.getBoundingClientRect();
        return {
          taglineAteRodape: Math.round(rodape.top - tagline.getBoundingClientRect().bottom),
          saudacaoNoTopo: Math.round(saudacao.top),
        };
      });
      expect(medidas.taglineAteRodape).toBeGreaterThanOrEqual(0);
      expect(medidas.saudacaoNoTopo).toBeGreaterThanOrEqual(0);
    });
  }
});
