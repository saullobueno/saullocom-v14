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

import robotoLatin from '@fontsource-variable/roboto/files/roboto-latin-wght-normal.woff2?url';

import imageHome from './assets/image-home.avif';
import WebAnalytics from './components/analytics';
import { idiomaDe, locales } from './i18n/locales';
import type { Route } from './+types/root';
import './index.css';

export const links: Route.LinksFunction = () => [
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', type: 'image/png', href: '/favicon.png', sizes: '64x64' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
  // LCP: o hero e background CSS, entao o navegador so o descobriria depois do CSS
  { rel: 'preload', as: 'image', href: imageHome, type: 'image/avif', fetchPriority: 'high' },
  // a fonte tambem so seria descoberta depois do CSS: o subset latino (o unico que o site usa)
  // ja comeca a baixar junto, e a troca de fonte some no primeiro carregamento
  { rel: 'preload', as: 'font', href: robotoLatin, type: 'font/woff2', crossOrigin: 'anonymous' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  return (
    <html lang={locales[idiomaDe(pathname)].lang} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* liga o modo palco antes da primeira pintura (so com JS e sem preferencia por menos movimento) */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&matchMedia('(min-height: 500px)').matches)document.documentElement.setAttribute('data-palco','')",
          }}
        />
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
      <WebAnalytics />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { pathname } = useLocation();
  const { notFound: t, path: home } = locales[idiomaDe(pathname)];
  const naoEncontrada = isRouteErrorResponse(error) && error.status === 404;
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
