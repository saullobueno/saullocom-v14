import type { CSSProperties } from 'react';

export type Revelacao = 'up' | 'left' | 'right' | 'pop' | 'curtain';

interface Opcoes {
  /** rolagem entre um indice e o proximo (padrao 60px); menor = cascata mais apertada */
  passo?: string;
  /** rolagem que a animacao leva para completar (padrao 280px) */
  duracao?: string;
}

// Props para revelar um elemento enquanto ele entra na tela (CSS em index.css, classes rv-*).
//   <div {...revelar('up', 2, 'mb-4')}>  ->  className="rv-up mb-4" e style={{ '--i': 2 }}
// `i` escalona irmaos: cada indice comeca um "passo" de rolagem depois do anterior.
export function revelar(tipo: Revelacao, i = 0, extra = '', { passo, duracao }: Opcoes = {}) {
  const style = { '--i': i } as CSSProperties & Record<string, string | number>;
  if (passo) style['--passo'] = passo;
  if (duracao) style['--dur'] = duracao;
  return { className: `rv-${tipo}${extra ? ` ${extra}` : ''}`, style };
}
