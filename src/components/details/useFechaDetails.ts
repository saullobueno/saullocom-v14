import { useEffect, type RefObject } from 'react';

// Fecha um <details> aberto ao clicar fora dele ou com Esc. Com Esc, se o foco estava dentro do
// menu, ele volta ao <summary> (quem usa teclado nao perde a posicao).
export function useFechaDetails(ref: RefObject<HTMLDetailsElement | null>) {
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const menu = ref.current;
      if (menu?.open && !menu.contains(e.target as Node)) menu.open = false;
    };
    const aoTeclar = (e: KeyboardEvent) => {
      const menu = ref.current;
      if (e.key !== 'Escape' || !menu?.open) return;
      const focoDentro = menu.contains(document.activeElement);
      menu.open = false;
      if (focoDentro) menu.querySelector('summary')?.focus();
    };
    document.addEventListener('click', aoClicar);
    document.addEventListener('keydown', aoTeclar);
    return () => {
      document.removeEventListener('click', aoClicar);
      document.removeEventListener('keydown', aoTeclar);
    };
  }, [ref]);
}
