// O que o site inteiro precisa de cada idioma (root, SEO, seletor de idioma e pagina de erro).
// Fica fora de pt.ts/en.ts para que cada rota carregue so os textos do proprio idioma.
export type Locale = 'pt' | 'en';

export const locales = {
  pt: {
    lang: 'pt-BR',
    ogLocale: 'pt_BR',
    path: '/',
    notFound: {
      heading: '404',
      text: 'Página não encontrada.',
      back: 'Voltar para o início',
      errorHeading: 'Ops!',
      errorText: 'Ocorreu um erro inesperado.',
    },
  },
  en: {
    lang: 'en',
    ogLocale: 'en_US',
    path: '/en',
    notFound: {
      heading: '404',
      text: 'Page not found.',
      back: 'Back to home',
      errorHeading: 'Oops!',
      errorText: 'An unexpected error occurred.',
    },
  },
} satisfies Record<Locale, unknown>;

// Idioma pela URL: /en e /en/... em ingles; o resto em portugues
export const idiomaDe = (pathname: string): Locale =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';
