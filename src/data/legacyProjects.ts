import portfolio from './portfolio.json';

// Imagens processadas pelo Vite (nome com hash e cache imutavel).
// Convencao de arquivo: portfolio-web-<slug>.avif (miniatura) e portfolio-web-<slug>-g.avif (lightbox).
const urls = import.meta.glob<string>('../assets/legacy/*.avif', {
  eager: true,
  query: '?url',
  import: 'default',
});

const urlDe = (slug: string, sufixo = '') => {
  const url = urls[`../assets/legacy/portfolio-web-${slug}${sufixo}.avif`];
  if (!url) throw new Error(`Imagem legada ausente para o slug "${slug}"`);
  return url;
};

export const legacyProjects = portfolio.map((projeto) => ({
  ...projeto,
  image: urlDe(projeto.slug),
  imageLarge: urlDe(projeto.slug, '-g'),
}));
