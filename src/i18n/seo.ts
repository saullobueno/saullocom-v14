import { messages, type Locale } from './index';

export const SITE = 'https://saullo.com';

const urlDe = (locale: Locale) => `${SITE}${messages[locale].path}`;

export function buildMeta(locale: Locale) {
  const t = messages[locale];
  return [
    { title: t.meta.title },
    { name: 'description', content: t.meta.description },
    { name: 'theme-color', content: '#1a1a1a' },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: t.ogLocale },
    { property: 'og:locale:alternate', content: messages[locale === 'pt' ? 'en' : 'pt'].ogLocale },
    { property: 'og:site_name', content: 'Saullo Bueno' },
    { property: 'og:title', content: t.meta.title },
    { property: 'og:description', content: t.meta.ogDescription },
    { property: 'og:url', content: urlDe(locale) },
    { property: 'og:image', content: `${SITE}/social.jpg` },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: t.meta.ogImageAlt },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Saullo Bueno',
        url: urlDe(locale),
        jobTitle: t.meta.jobTitle,
        inLanguage: t.lang,
        sameAs: ['https://github.com/saullobueno', 'https://linkedin.com/in/saullobueno'],
      },
    },
  ];
}

// canonical + hreflang (inclui x-default apontando para o portugues)
export function buildLinks(locale: Locale) {
  return [
    { rel: 'canonical', href: urlDe(locale) },
    { rel: 'alternate', hrefLang: 'pt-BR', href: urlDe('pt') },
    { rel: 'alternate', hrefLang: 'en', href: urlDe('en') },
    { rel: 'alternate', hrefLang: 'x-default', href: urlDe('pt') },
  ];
}
