// Imagem ativa: foto de escritorio noturno esmaecida (gerar-fundo-foto.mjs). Em standby, para voltar a uma
// delas troque o import abaixo e as medidas da imagem (width/height) mais adiante:
//   '@/assets/fundo-doodles.avif'    figurinhas, 1600x7200 (gerar-fundo-doodles.mjs)
//   '@/assets/fundo-codigo.avif'     janelas de IDE, 1600x7200 (gerar-fundo-codigo.mjs)
//   ilustracao vetorial: rode gerar-fundo-escritorio.mjs (demora) e use fundo-escritorio.avif, 1600x7200
import fundo from '@/assets/fundo-foto.avif';

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
        width={1422}
        height={2844}
        decoding="async"
        fetchPriority="low"
        className="fundo-codigo-img h-auto w-screen max-w-none min-w-[1000px] flex-none self-start"
      />
    </div>
  );
}
