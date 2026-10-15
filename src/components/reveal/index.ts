import type { CSSProperties } from 'react';

export type Revelacao = 'up' | 'left' | 'right' | 'pop' | 'curtain';

interface Opcoes {
  /** intervalo entre um indice e o proximo (padrao 70ms); menor = cascata mais apertada */
  atraso?: string;
}

// Props para revelar um elemento quando a cena dele fica ativa (CSS em index.css, classes rv-*).
//   <div {...revelar('up', 2, 'mb-4')}>  ->  className="rv-up mb-4" e style={{ '--i': 2 }}
// `i` escalona irmaos: cada indice entra um "atraso" depois do anterior.
export function revelar(tipo: Revelacao, i = 0, extra = '', { atraso }: Opcoes = {}) {
  const style = { '--i': i } as CSSProperties & Record<string, string | number>;
  if (atraso) style['--atraso'] = atraso;
  return { className: `rv-${tipo}${extra ? ` ${extra}` : ''}`, style };
}
