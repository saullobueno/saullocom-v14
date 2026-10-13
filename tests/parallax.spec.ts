import { expect, test } from '@playwright/test';

test.describe('parallax (movimento normal)', () => {
  test.use({ reducedMotion: 'no-preference' });

  for (const [nome, largura, altura] of [
    ['desktop', 1280, 720],
    ['mobile', 390, 844],
  ] as const) {
    test(`${nome}: o fundo do hero sempre cobre o hero durante a rolagem`, async ({ page }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await page.goto('/', { waitUntil: 'networkidle' });
      for (let y = 0; y <= altura * 1.2; y += 60) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        const [hero, fundo] = await page.evaluate(() => [
          document.querySelector('#top')!.getBoundingClientRect().toJSON(),
          document.querySelector('.parallax-bg')!.getBoundingClientRect().toJSON(),
        ]);
        expect(fundo.top, `y=${y}`).toBeLessThanOrEqual(hero.top + 0.5);
        expect(fundo.bottom, `y=${y}`).toBeGreaterThanOrEqual(hero.bottom - 0.5);
      }
    });

    test(`${nome}: as fotos sempre cobrem a propria moldura e nao ha rolagem horizontal`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: largura, height: altura });
      await page.goto('/', { waitUntil: 'networkidle' });
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      let verificadas = 0;
      for (let y = 0; y < total; y += 160) {
        await page.evaluate((v) => window.scrollTo(0, v), y);
        const resultado = await page.evaluate(() => {
          const falhas: string[] = [];
          let checadas = 0;
          for (const img of document.querySelectorAll('.parallax-img')) {
            const moldura = img.parentElement!.getBoundingClientRect();
            if (moldura.bottom < 0 || moldura.top > innerHeight) continue;
            const i = img.getBoundingClientRect();
            checadas++;
            if (i.top > moldura.top + 0.5 || i.bottom < moldura.bottom - 0.5)
              falhas.push(`vao vertical (${i.top.toFixed(1)}/${moldura.top.toFixed(1)})`);
          }
          const sobra = document.documentElement.scrollWidth - document.documentElement.clientWidth;
          return { falhas, checadas, sobra };
        });
        verificadas += resultado.checadas;
        expect(resultado.falhas, `y=${y}`).toEqual([]);
        expect(resultado.sobra, `y=${y}`).toBe(0);
      }
      expect(verificadas).toBeGreaterThan(10); // garante que o teste realmente mediu algo
    });
  }

  test('o hero se desloca em camadas: fundo e logo descem, titulo sobe', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const y = async (seletor: string) =>
      page.evaluate((s) => {
        const t = getComputedStyle(document.querySelector(s)!).translate;
        return t === 'none' ? 0 : parseFloat(t.split(' ')[1] ?? '0');
      }, seletor);

    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await y('.parallax-bg')).toBeCloseTo(0, 0);

    await page.evaluate(() => window.scrollTo(0, 500));
    await expect.poll(() => y('.parallax-bg')).toBeGreaterThan(20);
    expect(await y('.parallax-logo')).toBeGreaterThan(5);
    expect(await y('.parallax-title')).toBeLessThan(-3);
    // o fundo (mais distante) anda mais que a logo
    expect(await y('.parallax-bg')).toBeGreaterThan(await y('.parallax-logo'));
  });
});

test.describe('parallax (movimento reduzido)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nada se move nem e ampliado', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 500));
    const estado = await page.evaluate(() => {
      const estilo = (s: string) => getComputedStyle(document.querySelector(s)!);
      return {
        fundo: estilo('.parallax-bg').translate,
        logo: estilo('.parallax-logo').translate,
        titulo: estilo('.parallax-title').translate,
        foto: estilo('.parallax-img').scale,
        topoFundo: estilo('.parallax-bg').top,
      };
    });
    expect(estado).toEqual({
      fundo: 'none',
      logo: 'none',
      titulo: 'none',
      foto: 'none',
      topoFundo: '0px',
    });
  });
});
