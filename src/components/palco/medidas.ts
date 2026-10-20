// Ainda ha para onde rolar dentro do elemento, no sentido do gesto?
export function podeRolar(el: HTMLElement, descendo: boolean) {
  return descendo ? el.scrollTop + el.clientHeight < el.scrollHeight - 1 : el.scrollTop > 0;
}

// Indice da cena cujo topo esta mais perto da posicao de rolagem `y`
export function cenaMaisProxima(alvos: HTMLElement[], y: number) {
  let mais = 0;
  alvos.forEach((alvo, i) => {
    if (Math.abs(alvo.offsetTop - y) < Math.abs(alvos[mais].offsetTop - y)) mais = i;
  });
  return mais;
}
