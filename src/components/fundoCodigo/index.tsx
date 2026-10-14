// Textura de papel de jornal (gerada por scripts/gerar-fundo-papel.mjs, 1600x7200).
import fundo from '@/assets/fundo-papel.avif';

// Grao fino do papel: ruido SVG (feTurbulence) repetido sobre a imagem. Fica em CSS porque o AVIF
// da imagem apaga um grao tao fino.
const GRAO =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1.4 -0.35'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Papel de parede de desenvolvimento atras das secoes. A camada e fixa e a imagem (bem mais alta que a
// tela) sobe devagar enquanto a pagina rola (ver .fundo-codigo-img em index.css). O hero e o
// rodape sao opacos e a cobrem; so aparece atras do conteudo.
export default function FundoCodigo() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 flex justify-center overflow-hidden"
    >
      <img
        src={fundo}
        alt=""
        width={1600}
        height={7200}
        decoding="async"
        fetchPriority="low"
        className="fundo-codigo-img h-auto w-screen max-w-none min-w-[1000px] flex-none self-start"
      />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRAO }} />
    </div>
  );
}
