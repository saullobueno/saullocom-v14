// Miniatura (480px, gerada por scripts/otimizar-imagens.mjs) de cada captura dos projetos em destaque.
// O Vite da a mesma URL para o import da imagem e para o glob, entao o mapa vai da URL cheia a mini.
// (as opcoes do glob precisam ser literais; no-inline evita que minis pequenas virem data: no HTML)
const cheias = import.meta.glob<string>(
  ['../assets/portfolio/**/*.avif', '!../assets/portfolio/**/*-mini.avif'],
  { eager: true, query: '?no-inline', import: 'default' },
);
const minis = import.meta.glob<string>('../assets/portfolio/**/*-mini.avif', {
  eager: true,
  query: '?no-inline',
  import: 'default',
});

const porUrl = new Map(
  Object.entries(cheias).map(([caminho, url]) => [
    url,
    minis[caminho.replace(/\.avif$/, '-mini.avif')],
  ]),
);

/** Largura das miniaturas, para o srcset */
export const LARGURA_MINI = 480;

// Sem miniatura (imagem nova sem rodar o script), usa a propria imagem
export const miniaturaDe = (url: string) => porUrl.get(url) ?? url;
