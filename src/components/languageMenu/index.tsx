import { useEffect, useRef, type ReactNode } from 'react';

import { messages, useI18n, type Locale } from '../../i18n';

// Bandeiras em SVG (emoji de bandeira nao aparece no Windows). Para um idioma novo: incluir o
// locale em messages, a bandeira aqui e o nome em IDIOMAS.
const bandeiras: Record<Locale, ReactNode> = {
  pt: (
    <>
      <rect width="20" height="14" fill="#009c3b" />
      <path d="M10 1.8 18.2 7 10 12.2 1.8 7Z" fill="#ffdf00" />
      <circle cx="10" cy="7" r="3.2" fill="#002776" />
    </>
  ),
  en: (
    <>
      <rect width="20" height="14" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={i * 1.077} width="20" height="1.077" fill="#b22234" />
      ))}
      <rect width="9" height="7.5" fill="#3c3b6e" />
    </>
  ),
};

// Nome de cada idioma na propria lingua
const IDIOMAS: { locale: Locale; nome: string; lang: string }[] = [
  { locale: 'pt', nome: 'Português', lang: 'pt-BR' },
  { locale: 'en', nome: 'English', lang: 'en' },
];

function Bandeira({ locale }: { locale: Locale }) {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      aria-hidden="true"
      className="shrink-0 rounded-[2px]"
    >
      {bandeiras[locale]}
    </svg>
  );
}

export default function LanguageMenu() {
  const { locale, t } = useI18n();
  const menu = useRef<HTMLDetailsElement>(null);

  // Fecha ao clicar fora ou com Esc
  useEffect(() => {
    const fecha = () => {
      if (menu.current) menu.current.open = false;
    };
    const aoClicar = (e: MouseEvent) => {
      if (menu.current?.open && !menu.current.contains(e.target as Node)) fecha();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fecha();
    };
    document.addEventListener('click', aoClicar);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('click', aoClicar);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, []);

  return (
    <details ref={menu} className="relative">
      <summary
        aria-label={t.language.label}
        className="flex h-8 cursor-pointer list-none items-center gap-1.5 rounded-md border border-white/20 px-2.5 text-white/80 transition-colors hover:border-white hover:text-white [&::-webkit-details-marker]:hidden"
      >
        <Bandeira locale={locale} />
      </summary>
      <ul className="absolute right-0 mt-2 w-40 rounded-lg border border-white/15 bg-[#1a1a1a] p-1 shadow-xl">
        {IDIOMAS.map(({ locale: destino, nome, lang }) => (
          <li key={destino}>
            <a
              href={messages[destino].path}
              hrefLang={lang}
              lang={lang}
              aria-current={destino === locale ? 'true' : undefined}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white aria-[current]:bg-white/15 aria-[current]:text-white"
            >
              <Bandeira locale={destino} />
              {nome}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
