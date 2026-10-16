// Ajuste do conteudo de uma cena a caixa: fonte reduzida ate caber e, se ainda sobrar, rolagem
// interna com as bordas esmaecidas (ver .cena-caixa em index.css).

const caixaDe = (alvo: HTMLElement) => alvo.querySelector<HTMLElement>('.cena-caixa');

// Dica de que ha mais conteudo: o CSS esmaece a base (data-mais) e o topo (data-acima) da caixa
export function marcaMais(caixa: HTMLElement) {
  const rolavel = caixa.hasAttribute('data-rolavel');
  caixa.toggleAttribute('data-acima', rolavel && caixa.scrollTop > 1);
  caixa.toggleAttribute(
    'data-mais',
    rolavel && caixa.scrollTop + caixa.clientHeight < caixa.scrollHeight - 1,
  );
}

function limpaCaixa(caixa: HTMLElement) {
  caixa.removeAttribute('data-rolavel');
  caixa.removeAttribute('data-mais');
  caixa.removeAttribute('data-acima');
}

// Texto grande demais para a caixa: com `encolhe`, reduz a fonte da cena ate caber (no celular e
// no tablet a fonte e igual em todas as cenas e o que nao couber rola por dentro)
export function ajustaCena(alvo: HTMLElement, encolhe: boolean) {
  const caixa = caixaDe(alvo);
  if (!caixa) return;
  let escala = 1;
  limpaCaixa(caixa);
  caixa.style.setProperty('--ajuste', '1');
  while (encolhe && caixa.scrollHeight > caixa.clientHeight + 1 && escala > 0.55) {
    escala -= 0.04;
    caixa.style.setProperty('--ajuste', escala.toFixed(2));
  }
  // sobrou conteudo (fonte no minimo, ou sem encolher): a caixa rola por dentro, para nada ficar escondido
  if (caixa.scrollHeight > caixa.clientHeight + 1) caixa.setAttribute('data-rolavel', '');
  marcaMais(caixa);
  alvo.dataset.ajustada = '';
}

// Desfaz o ajuste e o estado da cena (palco desligado)
export function limpaCena(alvo: HTMLElement) {
  alvo.removeAttribute('data-estado');
  alvo.removeAttribute('data-perto');
  delete alvo.dataset.ajustada;
  const caixa = caixaDe(alvo);
  if (!caixa) return;
  caixa.style.removeProperty('--ajuste');
  limpaCaixa(caixa);
}
