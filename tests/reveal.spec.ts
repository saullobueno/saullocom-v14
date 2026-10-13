import { expect, test } from '@playwright/test';

// estilo computado relevante de cada tipo de revelacao
const ler = (seletor: string) => {
  const el = document.querySelector(seletor) as HTMLElement;
  const s = getComputedStyle(el);
  return { opacity: s.opacity, translate: s.translate, scale: s.scale, clip: s.clipPath };
};

const tipos = [
  { nome: 'rv-up (texto)', seletor: '#contact .rv-up' },
  { nome: 'rv-left (lista da esquerda)', seletor: '#expertise .rv-left' },
  { nome: 'rv-right (lista da direita)', seletor: '#expertise .rv-right' },
  { nome: 'rv-pop (tecnologia do card)', seletor: '#portfolio .rv-pop' },
] as const;

test.describe('revelacoes ao rolar (movimento normal)', () => {
  test.use({ reducedMotion: 'no-preference' });

  for (const { nome, seletor } of tipos) {
    test(`${nome}: comeca escondido abaixo da tela e fica pleno ao entrar`, async ({ page }) => {
      await page.goto('/', { waitUntil: 'networkidle' });
      await page.evaluate(() => window.scrollTo(0, 0));

      // longe da tela: ainda nao revelado
      const antes = await page.evaluate(ler, seletor);
      expect(antes.opacity, nome).toBe('0');

      // no centro da tela: revelado por completo
      await page.evaluate(
        (s) => document.querySelector(s)!.scrollIntoView({ block: 'center', behavior: 'instant' }),
        seletor,
      );
      await expect
        .poll(async () => (await page.evaluate(ler, seletor)).opacity, { message: nome })
        .toBe('1');
      const depois = await page.evaluate(ler, seletor);
      expect(
        depois.translate === 'none' || /^0(px)?( 0(px)?)?$/.test(depois.translate),
        `${nome}: translate ${depois.translate}`,
      ).toBe(true);
    });
  }

  test('fotos abrem como cortina e o fio do titulo se estende', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, 0));
    expect((await page.evaluate(ler, '#services .rv-curtain')).clip).toContain('inset(100%');
    expect((await page.evaluate(ler, '#services .rv-line')).scale).toMatch(/^0/);

    await page.evaluate(() =>
      document.getElementById('services')!.scrollIntoView({ block: 'center', behavior: 'instant' }),
    );
    await expect
      .poll(async () => (await page.evaluate(ler, '#services .rv-curtain')).clip)
      .not.toContain('inset(100%');
    await expect
      .poll(async () => (await page.evaluate(ler, '#services .rv-line')).scale)
      .toMatch(/^1/);
  });

  test('as palavras do titulo se revelam em sequencia (escalonamento)', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    // com o titulo entrando na tela, a 1a palavra esta mais avancada que a 2a
    await page.evaluate(() => {
      const el = document.getElementById('expertise-title')!;
      window.scrollTo(0, el.getBoundingClientRect().top + scrollY - (innerHeight - 90));
    });
    await page.waitForTimeout(300);
    const y = await page.evaluate(() =>
      [...document.querySelectorAll('#expertise-title .rv-rise')].map((e) => {
        const t = getComputedStyle(e).translate;
        return t === 'none' ? 0 : parseFloat(t.split(' ')[1]);
      }),
    );
    expect(y).toHaveLength(2);
    expect(y[0]).toBeLessThan(y[1]); // menos deslocamento = mais revelada
  });

  test('o titulo continua com nome acessivel completo', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'EXPERTISE TÉCNICA' })).toBeAttached();
    await expect(page.getByRole('heading', { name: 'MINHA TRAJETÓRIA' })).toBeAttached();
  });
});

test.describe('revelacoes ao rolar (movimento reduzido)', () => {
  test.use({ reducedMotion: 'reduce' });

  test('nada fica escondido, deslocado ou recortado', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const estado = await page.evaluate(() =>
      [...document.querySelectorAll('[class*="rv-"]')]
        .filter((e) => !e.classList.contains('rv-mask'))
        .map((e) => {
          const s = getComputedStyle(e);
          return {
            classe: e.className
              .toString()
              .split(' ')
              .find((c) => c.startsWith('rv-')),
            opacity: s.opacity,
            translate: s.translate,
            scale: s.scale,
            clip: s.clipPath,
          };
        })
        .filter(
          (e) =>
            e.opacity !== '1' || e.translate !== 'none' || e.scale !== 'none' || e.clip !== 'none',
        ),
    );
    expect(estado).toEqual([]);
  });
});
