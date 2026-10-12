import '@fontsource-variable/roboto';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';

import imageHome from './assets/image-home.avif';
import type { Route } from './+types/root';
import './index.css';

const SITE = 'https://saullo.com';
const TITULO = 'Saullo Bueno | Desenvolvedor Full Stack & UI/UX Designer';
const DESCRICAO =
  'Portfólio de Saullo Bueno, desenvolvedor Full Stack e UI/UX Designer. Node.js, React, React Native e soluções com Inteligência Artificial.';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'canonical', href: `${SITE}/` },
  // LCP: o hero e background CSS, entao o navegador so o descobriria depois do CSS
  { rel: 'preload', as: 'image', href: imageHome, type: 'image/avif', fetchPriority: 'high' },
];

export const meta: Route.MetaFunction = () => [
  { title: TITULO },
  { name: 'description', content: DESCRICAO },
  { name: 'theme-color', content: '#1a1a1a' },
  { property: 'og:type', content: 'website' },
  { property: 'og:locale', content: 'pt_BR' },
  { property: 'og:site_name', content: 'Saullo Bueno' },
  { property: 'og:title', content: TITULO },
  {
    property: 'og:description',
    content:
      'Engenharia de software Full Stack, UI/UX Design e aplicações com Inteligência Artificial.',
  },
  { property: 'og:url', content: `${SITE}/` },
  { property: 'og:image', content: `${SITE}/social.jpg` },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  {
    property: 'og:image:alt',
    content: 'Saullo Bueno, Desenvolvedor Full Stack. UI/UX Design, Node.js, React e React Native.',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    'script:ld+json': {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Saullo Bueno',
      url: `${SITE}/`,
      jobTitle: 'Desenvolvedor Full Stack e UI/UX Designer',
      sameAs: ['https://github.com/saullobueno', 'https://linkedin.com/in/saullobueno'],
    },
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const naoEncontrada = isRouteErrorResponse(error) && error.status === 404;
  return (
    <main className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">{naoEncontrada ? '404' : 'Ops!'}</h1>
      <p className="mb-8 text-lg">
        {naoEncontrada ? 'Página não encontrada.' : 'Ocorreu um erro inesperado.'}
      </p>
      <a href="/" className="text-accent underline">
        Voltar para o início
      </a>
    </main>
  );
}
