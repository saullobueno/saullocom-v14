import { useEffect } from 'react';

import 'lenis/dist/lenis.css';

// Rolagem suave: a roda do mouse rola a pagina em "degraus" de ~100px, o que torna o parallax
// quase imperceptivel. O Lenis interpola esses degraus (as animacoes de scroll em CSS seguem a
// posicao real da pagina, entao ficam suaves junto). Fica de fora para quem pediu menos
// movimento, que continua com a rolagem nativa. Carregado sob demanda.
export default function SmoothScroll() {
  useEffect(() => {
    const menosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: import('lenis').default | null = null;
    let cancelado = false;

    const ajusta = async () => {
      if (menosMovimento.matches) {
        lenis?.destroy();
        lenis = null;
        return;
      }
      if (lenis) return;
      const { default: Lenis } = await import('lenis');
      if (cancelado || lenis || menosMovimento.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        // links #secao tambem rolam suavemente; o Lenis ja respeita o scroll-margin-top das secoes
        // (que deixa o titulo logo abaixo da barra fixa)
        anchors: true,
        // o lightbox usa a roda do mouse para zoom: nao interferir
        prevent: (node) => node.closest('.yarl__root') !== null,
      });
    };

    void ajusta();
    menosMovimento.addEventListener('change', ajusta);
    return () => {
      cancelado = true;
      menosMovimento.removeEventListener('change', ajusta);
      lenis?.destroy();
    };
  }, []);

  return null;
}
