// Ponte entre o Palco (que sabe as cenas) e quem precisa navegar (Nav). O Palco registra aqui a
// funcao que leva a rolagem a uma cena.
let irPara: ((indice: number) => void) | null = null;

export function registrarControle(fn: ((indice: number) => void) | null) {
  irPara = fn;
}

export const palcoAtivo = () => document.documentElement.hasAttribute('data-palco');

// Cenas navegaveis: o ponto de partida do hero (indice 0) e depois cada .cena do <main>
export const alvosDoPalco = () => [
  ...document.querySelectorAll<HTMLElement>('main > .cena-hero, main .cena'),
];

// Leva a rolagem ao hero (0) ou a primeira cena da secao `id`
export function irParaSecao(id: string) {
  if (!irPara) return false;
  if (id === 'top') {
    irPara(0);
    return true;
  }
  const cena = document.getElementById(id)?.querySelector<HTMLElement>('.cena');
  const indice = cena ? alvosDoPalco().indexOf(cena) : -1;
  if (indice < 0) return false;
  irPara(indice);
  return true;
}
