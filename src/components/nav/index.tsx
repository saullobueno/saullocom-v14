import { useEffect, useRef, useState } from 'react';

import logo from '@/assets/logo.png';
import { useI18n } from '../../i18n';

const SECOES = ['about', 'expertise', 'services', 'portfolio', 'contact'] as const;

const linkBase =
  'rounded-md px-3 py-2 text-[0.95rem] font-medium whitespace-nowrap text-white/80 transition-colors hover:text-white';

export default function Nav() {
  const { t } = useI18n();
  const [ativa, setAtiva] = useState<string>('');
  const menu = useRef<HTMLDetailsElement>(null);
  const barra = useRef<HTMLElement>(null);

  // Destaca no menu a secao que esta cruzando o meio da tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) if (e.isIntersecting) setAtiva(e.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const id of SECOES) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // A barra so aparece depois da primeira rolagem (CSS). Quem navega por teclado precisa
  // alcanca-la no topo: o primeiro Tab a revela e ela fica visivel.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      barra.current?.setAttribute('data-teclado', '');
      window.removeEventListener('keydown', aoTeclar);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  const fechaMenu = () => {
    if (menu.current) menu.current.open = false;
  };

  const link = (id: (typeof SECOES)[number]) => (
    <a
      key={id}
      href={`#${id}`}
      onClick={fechaMenu}
      aria-current={ativa === id ? 'location' : undefined}
      className={`${linkBase} ${ativa === id ? '!text-white underline decoration-2 underline-offset-8' : ''}`}
    >
      {t.nav[id]}
    </a>
  );

  const idiomaDestino = t.switchTo.href === '/' ? 'pt-BR' : 'en';

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        {t.nav.skip}
      </a>

      <header ref={barra} className="nav-bar fixed inset-x-0 top-0 z-50 border-b border-white/10">
        <nav
          aria-label={t.nav.label}
          className="mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-3 px-3 md:gap-4 md:px-4"
        >
          <a href="#top" className="shrink-0">
            <img
              src={logo}
              alt="saullo.com"
              width={174}
              height={28}
              className="h-5 w-auto md:h-7"
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">{SECOES.map(link)}</div>

          <div className="flex items-center gap-1.5 md:gap-2">
            <a
              href={t.switchTo.href}
              hrefLang={idiomaDestino}
              lang={idiomaDestino}
              aria-label={t.switchTo.ariaLabel}
              className="rounded-md border border-white/20 px-2 py-1.5 text-[13px] font-semibold text-white/80 transition-colors hover:border-white hover:text-white md:px-2.5 md:text-sm"
            >
              {t.switchTo.short}
            </a>
            <a
              href="#contact"
              onClick={fechaMenu}
              className="rounded-md bg-accent-strong px-3 py-2 text-[13px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-accent-strong-hover max-[359px]:hidden md:px-3.5 md:text-sm"
            >
              {t.nav.cta}
            </a>

            <details ref={menu} className="relative md:hidden">
              <summary
                aria-label={t.nav.menu}
                className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-white/20 text-white [&::-webkit-details-marker]:hidden"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                  <path
                    d="M2 4h14M2 9h14M2 14h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 flex w-48 flex-col rounded-lg border border-white/15 bg-[#1a1a1a] p-2 shadow-xl">
                {SECOES.map(link)}
              </div>
            </details>
          </div>
        </nav>
        <div aria-hidden="true" className="nav-progress h-[3px] origin-left" />
      </header>
    </>
  );
}
