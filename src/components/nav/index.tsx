import { useEffect, useRef, useState, type MouseEvent } from 'react';

import logo from '@/assets/logo.png';
import { useI18n } from '../../i18n';
import { useFechaDetails } from '../details/useFechaDetails';
import LanguageMenu from '../languageMenu';
import { irParaSecao, palcoAtivo } from '../palco/controle';

const SECOES = ['about', 'expertise', 'services', 'portfolio', 'contact'] as const;

const linkBase =
  'rounded-md px-2.5 py-1.5 text-[0.82rem] font-medium whitespace-nowrap text-white/80 transition-colors hover:text-white';

export default function Nav() {
  const { t } = useI18n();
  const [ativa, setAtiva] = useState<string>('');
  const [visivel, setVisivel] = useState(false);
  const menu = useRef<HTMLDetailsElement>(null);
  const barra = useRef<HTMLElement>(null);
  useFechaDetails(menu);

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

  // A barra aparece depois da primeira rolagem e fica; no topo do hero ela se oculta de novo
  useEffect(() => {
    const aoRolar = () => {
      const rolou = window.scrollY > 8;
      setVisivel(rolou);
      if (!rolou) {
        if (!barra.current?.contains(document.activeElement)) {
          barra.current?.removeAttribute('data-teclado');
        }
        if (menu.current) menu.current.open = false;
      }
    };
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  // Quem navega por teclado precisa alcanca-la no topo: o primeiro Tab a revela e ela
  // fica visivel.
  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      barra.current?.setAttribute('data-teclado', '');
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, []);

  // No palco a secao e uma sequencia de cenas: a ancora leva a primeira delas
  const aoClicarLink = (e: MouseEvent<HTMLAnchorElement>) => {
    if (menu.current) menu.current.open = false;
    const alvo = e.currentTarget.dataset.alvo;
    if (palcoAtivo() && alvo && irParaSecao(alvo)) e.preventDefault();
  };

  const link = (id: (typeof SECOES)[number], suspenso = false) => (
    <a
      key={id}
      href={`#${id}`}
      data-alvo={id}
      onClick={aoClicarLink}
      aria-current={ativa === id ? 'location' : undefined}
      className={`${linkBase} ${
        ativa === id
          ? suspenso
            ? '!bg-white/15 !text-white'
            : '!text-white underline decoration-2 underline-offset-8'
          : ''
      }`}
    >
      {t.nav[id]}
    </a>
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        {t.nav.skip}
      </a>

      <header
        ref={barra}
        data-visivel={visivel ? '' : undefined}
        className="nav-bar fixed inset-x-0 top-0 z-50"
      >
        <nav
          aria-label={t.nav.label}
          className="flex h-12 w-full items-center justify-between gap-3 px-3 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 md:px-6"
        >
          <a href="#top" data-alvo="top" onClick={aoClicarLink} className="shrink-0">
            <img
              src={logo}
              alt="saullo.com"
              width={174}
              height={28}
              className="h-[18px] w-auto md:h-6"
            />
          </a>

          <div className="hidden items-center gap-1 md:flex">{SECOES.map((id) => link(id))}</div>

          <div className="flex items-center gap-1.5 md:gap-2 md:justify-self-end">
            <a
              href="#contact"
              data-alvo="contact"
              onClick={aoClicarLink}
              className="flex h-8 items-center rounded-md bg-accent-strong px-2.5 text-[12px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-accent-strong-hover max-[359px]:hidden md:px-3 md:text-[0.8rem]"
            >
              {t.nav.cta}
            </a>

            <LanguageMenu />

            <details ref={menu} className="relative md:hidden">
              <summary
                aria-label={t.nav.menu}
                className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-md border border-white/20 text-white [&::-webkit-details-marker]:hidden"
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
                {SECOES.map((id) => link(id, true))}
              </div>
            </details>
          </div>
        </nav>
      </header>
    </>
  );
}
