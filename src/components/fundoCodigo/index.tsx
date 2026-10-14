// Reticula de micro pontos, efeito de tela (gerada por scripts/gerar-fundo-pontos.mjs, 1600x3911).
import fundo from '@/assets/fundo-pontos.avif';

// Papel de parede atras das secoes. A camada e fixa e a imagem (mais alta que a tela) sobe devagar
// enquanto a pagina rola (ver .fundo-codigo-img em index.css). O hero e o rodape sao opacos e a
// cobrem; so aparece atras do conteudo.
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
        height={3911}
        decoding="async"
        fetchPriority="low"
        className="fundo-codigo-img h-auto w-screen max-w-none min-w-[1000px] flex-none self-start"
      />
    </div>
  );
}
