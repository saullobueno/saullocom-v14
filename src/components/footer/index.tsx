import type { ReactNode } from 'react';

// Rodape: autoria (esquerda) e copyright (direita). Na rolagem normal e um rodape comum; no palco,
// uma linha pequena na base da tela, sobre o hero (ver .copyright em index.css).
export default function Footer({ children }: { children?: ReactNode }) {
  return <footer className="copyright [&_p]:m-0 [&_p]:leading-[180%]">{children}</footer>;
}
