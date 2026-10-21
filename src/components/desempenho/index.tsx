import { useEffect } from 'react';

// Abaixo disso a animacao de cor do hero deixa a pagina travada. Medido sem GPU (Firefox com
// aceleracao desligada): 5 a 13 fps com a animacao e 60 sem ela.
const FPS_MINIMO = 30;
const AMOSTRA_MS = 1500;
// Folga depois do load (hidratacao e imagens distorceriam a medida) e depois de abrir uma cena
// (as transicoes de entrada precisam terminar)
const ASSENTAR_MS = 600;
const ENTRADA_DA_CENA_MS = 2200;

export const CHAVE_DESEMPENHO = 'desempenho';

const pausa = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const carregada = () =>
  document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

const emSegundoPlano = () => document.visibilityState !== 'visible';

const voltouAoPrimeiroPlano = () =>
  new Promise<void>((resolve) => {
    const aoMudar = () => {
      if (emSegundoPlano()) return;
      document.removeEventListener('visibilitychange', aoMudar);
      resolve();
    };
    document.addEventListener('visibilitychange', aoMudar);
  });

// Quadros por segundo durante `ms`. Devolve null se a aba foi para o fundo no meio da medida: o
// navegador pausa os quadros e o numero nao valeria nada.
function medeFps(ms: number) {
  return new Promise<number | null>((resolve) => {
    let inicio = 0;
    let quadros = 0;
    const fim = (valor: number | null) => {
      document.removeEventListener('visibilitychange', aoEsconder);
      resolve(valor);
    };
    const aoEsconder = () => {
      if (emSegundoPlano()) fim(null);
    };
    const passo = (agora: number) => {
      if (!inicio) inicio = agora;
      else quadros++;
      if (agora - inicio >= ms) fim(quadros / ((agora - inicio) / 1000));
      else requestAnimationFrame(passo);
    };
    document.addEventListener('visibilitychange', aoEsconder);
    requestAnimationFrame(passo);
  });
}

// Mede ate obter uma amostra valida (aba em primeiro plano)
async function amostra() {
  for (;;) {
    if (emSegundoPlano()) await voltouAoPrimeiroPlano();
    const fps = await medeFps(AMOSTRA_MS);
    if (fps !== null) return fps;
  }
}

// A animacao de cor do hero fica para todo mundo; so e desligada (html[data-leve], ver index.css)
// onde o desenho nao acompanha, tipicamente sem GPU. Mede ao carregar e de novo na primeira vez
// que uma cena abre, porque ai entra o painel com blur por cima e o custo sobe. A decisao vale
// para a sessao (o script do <head> em root.tsx a reaplica antes da primeira pintura).
export default function Desempenho() {
  useEffect(() => {
    const raiz = document.documentElement;
    if (raiz.hasAttribute('data-leve')) return;
    // com menos movimento nao ha animacao nenhuma para desligar
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelado = false;
    let observador: MutationObserver | undefined;

    const ativaModoLeve = () => {
      raiz.setAttribute('data-leve', '');
      try {
        sessionStorage.setItem(CHAVE_DESEMPENHO, 'leve');
      } catch {
        // armazenamento bloqueado: vale so para esta pagina
      }
    };

    const abriuUmaCena = () =>
      new Promise<void>((resolve) => {
        if (raiz.hasAttribute('data-rolou')) return resolve();
        observador = new MutationObserver(() => {
          if (!raiz.hasAttribute('data-rolou')) return;
          observador?.disconnect();
          resolve();
        });
        observador.observe(raiz, { attributes: true, attributeFilter: ['data-rolou'] });
      });

    const avalia = async () => {
      await carregada();
      await pausa(ASSENTAR_MS);
      if (cancelado) return;
      if ((await amostra()) < FPS_MINIMO) return ativaModoLeve();

      await abriuUmaCena();
      await pausa(ENTRADA_DA_CENA_MS);
      if (cancelado) return;
      if ((await amostra()) < FPS_MINIMO) ativaModoLeve();
    };
    void avalia();

    return () => {
      cancelado = true;
      observador?.disconnect();
    };
  }, []);

  return null;
}
