import { useEffect, type ReactNode } from 'react';

import { useI18n } from '../../i18n';
import { alvosDoPalco, registrarControle } from './controle';

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

// Liga o modo "palco": o hero fica fixo e cada gesto de rolagem avanca (ou volta) uma cena inteira.
// O estado de cada cena (antes | ativa | depois) vai num atributo e o CSS faz as transicoes; nada
// aqui re-renderiza o React. Sem JS, com menos movimento ou com tela muito baixa, a pagina segue
// como um fluxo comum de secoes.
export default function Palco({ children }: { children: ReactNode }) {
  const { t } = useI18n();

  useEffect(() => {
    const raiz = document.documentElement;
    const reduz = window.matchMedia('(prefers-reduced-motion: reduce)');
    const baixa = window.matchMedia('(max-height: 499px)');

    let alvos: HTMLElement[] = [];
    let atual = 0;
    let travadoAte = 0;
    let ultimoEvento = 0;
    let ignoraRolagemAte = 0;
    let quadro = 0;
    let ajusteTimer = 0;
    let ligado = false;

    const limita = (n: number) => Math.min(alvos.length - 1, Math.max(0, n));

    // Texto grande demais para a caixa: reduz a fonte da cena ate caber (so cenas renderizadas)
    const ajustaCena = (alvo: HTMLElement) => {
      const caixa = alvo.querySelector<HTMLElement>('.cena-caixa');
      if (!caixa) return;
      let escala = 1;
      caixa.style.setProperty('--ajuste', '1');
      while (caixa.scrollHeight > caixa.clientHeight + 1 && escala > 0.55) {
        escala -= 0.04;
        caixa.style.setProperty('--ajuste', escala.toFixed(2));
      }
      alvo.dataset.ajustada = '';
    };

    // Barra de rolagem de vidro (a nativa fica escondida no palco): acompanha a rolagem e, ao
    // clicar ou arrastar, leva a cena correspondente
    const barra = () => document.querySelector<HTMLElement>('.barra-vidro');

    const atualizaBarra = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const prog = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      raiz.style.setProperty('--prog', prog.toFixed(4));
    };

    const aoPressionarBarra = (e: PointerEvent) => {
      const trilho = e.currentTarget as HTMLElement;
      trilho.setPointerCapture(e.pointerId);
      const segue = (ev: PointerEvent) => {
        const r = trilho.getBoundingClientRect();
        const f = Math.min(0.999, Math.max(0, (ev.clientY - r.top) / r.height));
        vaiPara(Math.floor(f * alvos.length), true);
      };
      segue(e);
      trilho.addEventListener('pointermove', segue);
      const solta = () => {
        trilho.removeEventListener('pointermove', segue);
        trilho.removeEventListener('pointerup', solta);
        trilho.removeEventListener('pointercancel', solta);
      };
      trilho.addEventListener('pointerup', solta);
      trilho.addEventListener('pointercancel', solta);
    };

    // Pontos laterais: um por cena (e o hero), maiores no inicio de cada secao
    const pontos = () => document.querySelector<HTMLElement>('.pontos');

    const montaPontos = () => {
      const lista = pontos();
      if (!lista) return;
      lista.replaceChildren(
        ...alvos.map((alvo, i) => {
          const ponto = document.createElement('button');
          const rotulo = alvo.dataset.rotulo ?? '';
          const inicioDeSecao =
            !alvo.classList.contains('cena') || alvo.parentElement?.querySelector('.cena') === alvo;
          ponto.type = 'button';
          ponto.className = inicioDeSecao ? 'ponto ponto-grande' : 'ponto';
          ponto.dataset.rotulo = rotulo;
          ponto.setAttribute('aria-label', rotulo);
          ponto.addEventListener('click', () => vaiPara(i));
          return ponto;
        }),
      );
    };

    const marcaPonto = () => {
      pontos()
        ?.querySelectorAll('.ponto')
        .forEach((ponto, i) => {
          if (i === atual) ponto.setAttribute('aria-current', 'true');
          else ponto.removeAttribute('aria-current');
        });
    };

    const aplica = () => {
      alvos.forEach((alvo, i) => {
        if (alvo.classList.contains('cena-hero')) return;
        alvo.dataset.estado = i < atual ? 'antes' : i > atual ? 'depois' : 'ativa';
        // so a cena atual e as vizinhas sao renderizadas (e carregam suas imagens)
        const perto = Math.abs(i - atual) <= 1;
        alvo.toggleAttribute('data-perto', perto);
        if (perto && !('ajustada' in alvo.dataset)) ajustaCena(alvo);
      });
      raiz.style.setProperty('--painel', atual > 0 ? '1' : '0');
      marcaPonto();
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
      // lista interna rolavel (projetos legados): rola ela enquanto houver para onde ir
      const lista = alvo.closest<HTMLElement>('.lista-rolavel');
      if (lista) {
        const podeDescer = lista.scrollTop + lista.clientHeight < lista.scrollHeight - 1;
        const podeSubir = lista.scrollTop > 0;
        if ((e.deltaY > 0 && podeDescer) || (e.deltaY < 0 && podeSubir)) return;
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

    // Barra de rolagem arrastada ou dedo deslizando (snap nativo): a cena segue a posicao
    const aoRolar = () => {
      atualizaBarra();
      if (quadro) return;
      quadro = requestAnimationFrame(() => {
        quadro = 0;
        if (performance.now() < ignoraRolagemAte) return;
        const y = window.scrollY;
        let mais = 0;
        alvos.forEach((alvo, i) => {
          if (Math.abs(alvo.offsetTop - y) < Math.abs(alvos[mais].offsetTop - y)) mais = i;
        });
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
      raiz.removeAttribute('data-rolou');
      raiz.style.removeProperty('--painel');
      for (const alvo of alvos) {
        alvo.removeAttribute('data-estado');
        alvo.removeAttribute('data-perto');
        delete alvo.dataset.ajustada;
        alvo.querySelector<HTMLElement>('.cena-caixa')?.style.removeProperty('--ajuste');
      }
      pontos()?.replaceChildren();
      barra()?.removeEventListener('pointerdown', aoPressionarBarra);
      raiz.style.removeProperty('--prog');
      raiz.style.removeProperty('--n');
      window.removeEventListener('wheel', aoRodar);
      window.removeEventListener('keydown', aoTeclar);
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRedimensionar);
      document.removeEventListener('focusin', aoFocar);
    };

    const liga = () => {
      if (reduz.matches || baixa.matches) {
        desliga();
        return;
      }
      if (ligado) return;
      ligado = true;
      raiz.setAttribute('data-palco', '');
      alvos = alvosDoPalco();
      montaPontos();
      registrarControle(vaiPara);
      raiz.style.setProperty('--n', String(alvos.length));
      barra()?.addEventListener('pointerdown', aoPressionarBarra);
      window.addEventListener('wheel', aoRodar, { passive: false });
      window.addEventListener('keydown', aoTeclar);
      window.addEventListener('scroll', aoRolar, { passive: true });
      window.addEventListener('resize', aoRedimensionar);
      document.addEventListener('focusin', aoFocar);

      // cena em que a pagina ja esta (recarregar no meio, voltar do historico)
      let mais = 0;
      alvos.forEach((alvo, i) => {
        if (
          Math.abs(alvo.offsetTop - window.scrollY) <
          Math.abs(alvos[mais].offsetTop - window.scrollY)
        ) {
          mais = i;
        }
      });
      atual = mais;
      aplica();
      atualizaBarra();
      agendaAjuste();
      void document.fonts?.ready.then(agendaAjuste);
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
      <div aria-hidden="true" className="barra-vidro">
        <div className="barra-polegar" />
      </div>
      {children}
    </main>
  );
}
