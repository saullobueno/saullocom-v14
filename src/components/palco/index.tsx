import { useEffect, type ReactNode } from 'react';

import { useI18n } from '../../i18n';
import { ajustaCena, limpaCena, marcaMais } from './ajuste';
import { alvosDoPalco, registrarControle } from './controle';
import { cenaMaisProxima, podeRolar } from './medidas';
import { marcaPonto, montaPontos, removePontos } from './pontos';

// Tempo que um gesto de rolagem "trava" os seguintes (a cena nova precisa entrar)
const TRAVA_MS = 800;
// Pausa na roda/trackpad que separa um gesto do seguinte (a inercia do trackpad e um fluxo
// continuo de eventos e nao pode virar varias cenas)
const PAUSA_MS = 90;

const teclasDeCena: Record<string, number | 'inicio' | 'fim'> = {
  ArrowDown: 1,
  PageDown: 1,
  ArrowUp: -1,
  PageUp: -1,
  Home: 'inicio',
  End: 'fim',
};

// Elementos que rolam por dentro antes de a roda trocar de cena: a lista expandida de projetos
// legados e a caixa de uma cena que nao coube
const ROLAVEIS = ['.lista-rolavel', '.cena-caixa[data-rolavel]'];

// Liga o modo "palco": o hero fica fixo e cada gesto de rolagem avanca (ou volta) uma cena inteira.
// O estado de cada cena (antes | ativa | depois) vai num atributo e o CSS faz as transicoes; nada
// aqui re-renderiza o React. Sem JS, com menos movimento ou com tela muito baixa, a pagina segue
// como um fluxo comum de secoes. O ajuste das caixas fica em ajuste.ts e os pontos em pontos.ts.
export default function Palco({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  useEffect(() => {
    const raiz = document.documentElement;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    const baixa = window.matchMedia('(max-height: 499px)');
    // mesmo limite do --breakpoint-md (index.css): abaixo dele e celular/tablet
    const compacta = window.matchMedia('(max-width: 880px)');

    let alvos: HTMLElement[] = [];
    let atual = 0;
    let travadoAte = 0;
    let ultimoEvento = 0;
    let ignoraRolagemAte = 0;
    let quadro = 0;
    let ajusteTimer = 0;
    let ligado = false;

    const limita = (n: number) => Math.min(alvos.length - 1, Math.max(0, n));

    // scroll nao propaga: a captura no document pega a rolagem de qualquer caixa
    const aoRolarCaixa = (e: Event) => {
      const caixa = e.target;
      if (caixa instanceof HTMLElement && caixa.classList.contains('cena-caixa')) marcaMais(caixa);
    };

    const estadoDe = (i: number) => (i < atual ? 'antes' : i > atual ? 'depois' : 'ativa');

    // Cena recem-revelada (saindo de content-visibility: hidden): o estilo dela pode estar
    // desatualizado (de antes do CSS chegar, ou de quando estava ativa) e o navegador animaria dessa
    // posicao antiga ate a certa, mostrando o conteudo de relance (ex.: Habilidades piscando ao ir
    // do hero para Sobre). Entao ela nasce sem transicoes (data-revelando) e, se for a ativa, num
    // estado neutro; dois quadros depois vale o estado de verdade, ja com a entrada animada.
    const revela = (alvo: HTMLElement, i: number) => {
      alvo.setAttribute('data-revelando', '');
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (!ligado) return;
          alvo.removeAttribute('data-revelando');
          alvo.dataset.estado = estadoDe(i);
        }),
      );
    };

    const aplica = () => {
      alvos.forEach((alvo, i) => {
        if (alvo.classList.contains('cena-hero')) return;
        const estado = estadoDe(i);
        // so a cena atual e as vizinhas sao renderizadas (e carregam suas imagens)
        const perto = Math.abs(i - atual) <= 1;
        const revelada = perto && !alvo.hasAttribute('data-perto');
        // cena que volta a ser a ativa comeca do topo, nao de onde a rolagem interna parou
        if (estado === 'ativa' && alvo.dataset.estado && alvo.dataset.estado !== 'ativa') {
          alvo.querySelector<HTMLElement>('.cena-caixa')?.scrollTo({ top: 0, behavior: 'instant' });
        }
        if (revelada) revela(alvo, i);
        alvo.dataset.estado = revelada && estado === 'ativa' ? 'depois' : estado;
        alvo.toggleAttribute('data-perto', perto);
        // celular e tablet: a fonte nao encolhe, o que nao couber rola por dentro
        if (perto && !('ajustada' in alvo.dataset)) ajustaCena(alvo, !compacta.matches);
      });
      raiz.style.setProperty('--painel', atual > 0 ? '1' : '0');
      marcaPonto(atual);
      raiz.toggleAttribute('data-rolou', atual > 0);
    };

    const rola = (imediato: boolean) => {
      ignoraRolagemAte = performance.now() + 1100;
      window.scrollTo({ top: alvos[atual].offsetTop, behavior: imediato ? 'instant' : 'smooth' });
    };

    const vaiPara = (indice: number, imediato = false) => {
      const novo = limita(indice);
      if (novo === atual && !imediato) return;
      // saltos de varias cenas (menu, Home/End) vao direto: a transicao e a das cenas
      const salto = Math.abs(novo - atual) > 1;
      atual = novo;
      aplica();
      rola(imediato || salto);
    };

    // Um gesto de roda ou trackpad: uma cena, sem importar a quantidade de rolagem
    const aoRodar = (e: WheelEvent) => {
      const alvo = e.target as HTMLElement;
      if (alvo.closest('.yarl__root')) return;
      // dentro de algo que rola por dentro: rola ele enquanto houver para onde ir (so troca de
      // cena nas pontas)
      for (const seletor of ROLAVEIS) {
        const rolavel = alvo.closest<HTMLElement>(seletor);
        if (rolavel && podeRolar(rolavel, e.deltaY > 0)) return;
      }
      if (e.ctrlKey) return; // zoom por pinca
      e.preventDefault();
      const agora = performance.now();
      const pausou = agora - ultimoEvento > PAUSA_MS;
      ultimoEvento = agora;
      if (agora < travadoAte || !pausou || Math.abs(e.deltaY) < 2) return;
      travadoAte = agora + TRAVA_MS;
      vaiPara(atual + (e.deltaY > 0 ? 1 : -1));
    };

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      const alvo = e.target as HTMLElement;
      if (alvo.closest('.yarl__root, input, textarea, select, [contenteditable]')) return;
      let passo: number | 'inicio' | 'fim' | undefined = teclasDeCena[e.key];
      if (e.key === ' ' && !alvo.closest('a, button, summary')) passo = e.shiftKey ? -1 : 1;
      if (passo === undefined) return;
      e.preventDefault();
      const agora = performance.now();
      if (agora < travadoAte) return;
      travadoAte = agora + TRAVA_MS * 0.6;
      if (passo === 'inicio') vaiPara(0);
      else if (passo === 'fim') vaiPara(alvos.length - 1);
      else vaiPara(atual + passo);
    };

    // Dedo deslizando ou teclado (snap nativo): a cena segue a posicao
    const aoRolar = () => {
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        if (performance.now() < ignoraRolagemAte) return;
        const mais = cenaMaisProxima(alvos, window.scrollY);
        if (mais !== atual) {
          atual = mais;
          aplica();
        }
      });
    };

    // Quem navega por teclado cai numa cena que nao e a ativa: leva a rolagem ate ela
    const aoFocar = (e: FocusEvent) => {
      const cena = (e.target as HTMLElement).closest<HTMLElement>('.cena');
      if (!cena || cena.dataset.estado === 'ativa') return;
      vaiPara(alvos.indexOf(cena));
    };

    const ajusta = () => {
      for (const alvo of alvos) delete alvo.dataset.ajustada;
      aplica();
    };

    const agendaAjuste = () => {
      clearTimeout(ajusteTimer);
      ajusteTimer = window.setTimeout(ajusta, 120);
    };

    const aoRedimensionar = () => {
      agendaAjuste();
      window.scrollTo({ top: alvos[atual].offsetTop, behavior: 'instant' });
    };

    const desliga = () => {
      if (!ligado) return;
      ligado = false;
      registrarControle(null);
      raiz.removeAttribute('data-palco');
      raiz.removeAttribute('data-pronto');
      raiz.removeAttribute('data-rolou');
      raiz.style.removeProperty('--painel');
      alvos.forEach(limpaCena);
      removePontos();
      document.removeEventListener('scroll', aoRolarCaixa, true);
      window.removeEventListener('wheel', aoRodar);
      window.removeEventListener('keydown', aoTeclar);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRedimensionar);
      document.removeEventListener('focusin', aoFocar);
    };

    const liga = () => {
      if (reduz.matches || baixa.matches) {
        desliga();
        // o atributo pode ter vindo do script do <head> (antes de a tela mudar): sem ouvintes, sem palco
        raiz.removeAttribute('data-palco');
        return;
      }
      if (ligado) return;
      ligado = true;
      raiz.setAttribute('data-palco', '');
      alvos = alvosDoPalco();
      montaPontos(alvos, vaiPara);
      registrarControle(vaiPara);
      window.addEventListener('wheel', aoRodar, { passive: false });
      window.addEventListener('keydown', aoTeclar);
      window.addEventListener('scroll', aoRolar, { passive: true });
      window.addEventListener('resize', aoRedimensionar);
      document.addEventListener('focusin', aoFocar);
      document.addEventListener('scroll', aoRolarCaixa, { capture: true, passive: true });

      // cena em que a pagina ja esta (recarregar no meio, voltar do historico)
      atual = cenaMaisProxima(alvos, window.scrollY);
      aplica();
      agendaAjuste();
      void document.fonts?.ready.then(agendaAjuste);
      // ouvintes registrados: a rolagem responde (some a barra de carregamento, entra a dica)
      raiz.setAttribute('data-pronto', '');
    };

    liga();
    reduz.addEventListener('change', liga);
    baixa.addEventListener('change', liga);
    return () => {
      reduz.removeEventListener('change', liga);
      baixa.removeEventListener('change', liga);
      clearTimeout(ajusteTimer);
      cancelAnimationFrame(quadro);
      desliga();
    };
  }, []);

  return (
    <main id="main" tabIndex={-1} className="p-0 outline-none">
      {/* ponto de partida do hero e caixa escura embacada (so existem no modo palco) */}
      <div aria-hidden="true" className="cena-hero" data-rotulo={t.nav.home} />
      <div aria-hidden="true" className="painel" />
      <nav aria-label={t.nav.scenes} className="pontos" />
      {children}
    </main>
  );
}
