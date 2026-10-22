import { useMessages } from '../../i18n';

// Indicador abaixo da logo do hero (ver .rolar-* em index.css). Dentro do box escuro, no mesmo lugar
// para duas situacoes:
//  - ate o site ficar pronto (palco ainda sem ouvintes): spinner, o carregamento de verdade;
//  - depois: mouse com a rodinha descendo e uma seta, a dica para rolar.
// Fora e abaixo do box fica a legenda "Role a pagina", que aparece junto com o icone. Tudo some
// quando uma cena abre.
// Decorativo: o menu e os pontos de cena ja dao o caminho para quem usa leitor de tela. O fundo
// escuro suave do box garante contraste sobre a foto, sem blur (que pesaria sem GPU).
export default function DicaDeRolagem() {
  const { hero } = useMessages();
  return (
    <div
      aria-hidden="true"
      className="rolar-dica mx-auto mt-14 flex w-fit flex-col items-center gap-2 max-md:mt-5 max-md:gap-1.5"
    >
      <div className="grid place-items-center rounded-full bg-black/25 px-3 py-2.5 text-white max-md:px-2.5 max-md:py-2">
        <svg
          className="rolar-carregando [grid-area:1/1]"
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <circle cx="17" cy="17" r="13" opacity="0.25" />
          <path d="M17 4a13 13 0 0 1 13 13" />
        </svg>

        <div className="rolar-icone flex flex-col items-center gap-1.5 [grid-area:1/1] max-md:gap-1">
          <svg
            className="max-md:h-[38px] max-md:w-6"
            width="30"
            height="48"
            viewBox="0 0 30 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <rect x="1.5" y="1.5" width="27" height="45" rx="13.5" />
            <circle
              className="rolar-roda"
              cx="15"
              cy="14"
              r="3"
              fill="currentColor"
              stroke="none"
            />
          </svg>
          <svg
            className="rolar-seta max-md:h-2.5 max-md:w-4"
            width="20"
            height="12"
            viewBox="0 0 18 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 2l7 6 7-6" />
          </svg>
        </div>
      </div>

      <span className="rolar-legenda text-[0.68rem] leading-none font-medium tracking-wide whitespace-nowrap text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.85)] max-md:text-[0.62rem]">
        {hero.scrollHint}
      </span>
    </div>
  );
}
