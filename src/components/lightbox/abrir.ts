import type { MouseEvent } from 'react';

// As imagens ampliaveis sao links para a imagem cheia: sem JavaScript o navegador a abre numa aba.
// Com JavaScript o clique abre o lightbox; Ctrl/Cmd/Shift/Alt e o botao do meio seguem como link
// (abrir em outra aba ou janela).
export const abreNoLightbox = (abrir: () => void) => (e: MouseEvent<HTMLAnchorElement>) => {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  abrir();
};

// Atributos do link que ampliam uma imagem (para quando nao ha JavaScript)
export const linkDaImagem = (href: string) =>
  ({ href, target: '_blank', rel: 'noopener noreferrer', draggable: false }) as const;
