import '@fontsource-variable/roboto';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from 'react-router';

import imageHome from './assets/image-home.avif';
import WebAnalytics from './components/analytics';
import SmoothScroll from './components/smoothScroll';
import { messages, type Locale } from './i18n';
import type { Route } from './+types/root';
import './index.css';

// Idioma pela URL: /en e /en/... em ingles; o resto em portugues
const idiomaDe = (pathname: string): Locale =>
  pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'pt';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  // LCP: o hero e background CSS, entao o navegador so o descobriria depois do CSS
  { rel: 'preload', as: 'image', href: imageHome, type: 'image/avif', fetchPriority: 'high' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <html lang={messages[idiomaDe(pathname)].lang}>
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
  return (
    <>
      <Outlet />
      <SmoothScroll />
      <WebAnalytics />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { pathname } = useLocation();
  const t = messages[idiomaDe(pathname)].notFound;
  const naoEncontrada = isRouteErrorResponse(error) && error.status === 404;
  const home = idiomaDe(pathname) === 'en' ? '/en' : '/';
  return (
    <main className="mx-auto max-w-3xl px-4 py-32 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">
        {naoEncontrada ? t.heading : t.errorHeading}
      </h1>
      <p className="mb-8 text-lg">{naoEncontrada ? t.text : t.errorText}</p>
      <a href={home} className="text-accent underline">
        {t.back}
      </a>
    </main>
  );
}
