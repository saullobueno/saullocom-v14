// Pontos laterais: um por cena (e o hero), maiores no inicio de cada secao. Sao criados direto no
// DOM, como o resto do palco, para que trocar de cena nao re-renderize o React.

const lista = () => document.querySelector<HTMLElement>('.pontos');

export function montaPontos(alvos: HTMLElement[], aoClicar: (indice: number) => void) {
  lista()?.replaceChildren(
    ...alvos.map((alvo, i) => {
      const ponto = document.createElement('button');
      const rotulo = alvo.dataset.rotulo ?? '';
      const inicioDeSecao =
        !alvo.classList.contains('cena') || alvo.parentElement?.querySelector('.cena') === alvo;
      ponto.type = 'button';
      ponto.className = inicioDeSecao ? 'ponto ponto-grande' : 'ponto';
      ponto.dataset.rotulo = rotulo;
      ponto.setAttribute('aria-label', rotulo);
      ponto.addEventListener('click', () => aoClicar(i));
      return ponto;
    }),
  );
}

export function marcaPonto(atual: number) {
  lista()
    ?.querySelectorAll('.ponto')
    .forEach((ponto, i) => {
      if (i === atual) ponto.setAttribute('aria-current', 'true');
      else ponto.removeAttribute('aria-current');
    });
}

export function removePontos() {
  lista()?.replaceChildren();
}
