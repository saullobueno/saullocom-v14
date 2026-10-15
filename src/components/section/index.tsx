import { Fragment, type ComponentProps, type CSSProperties, type ReactNode } from 'react';

import { revelar } from '../reveal';

interface SectionProps {
  /** Cor do texto da secao (token do tema, ex.: 'text-about') */
  tone: string;
  /** Ancora da secao; o titulo precisa ter id `${id}-title` */
  id: string;
  children: ReactNode;
}

export default function Section({ tone, id, children }: SectionProps) {
  return (
    // overflow-x: clip impede que revelacoes laterais (translate) criem rolagem horizontal
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto w-[1280px] overflow-x-clip py-32 text-center max-xl:my-8 max-xl:w-[calc(100%-2rem)] ${tone}`}
    >
      {children}
    </section>
  );
}

// Uma "cena" do palco: reserva uma tela de rolagem e mostra o conteudo no centro enquanto esta
// ativa (ver Palco e a secao "Palco" de index.css). Sem o palco, e um bloco comum.
export function Cena({
  children,
  className = '',
  rotulo,
}: {
  children: ReactNode;
  className?: string;
  /** nome da cena nos pontos de navegacao */
  rotulo?: string;
}) {
  return (
    <div className="cena" data-rotulo={rotulo}>
      <div className="cena-palco">
        <div className={`cena-caixa ${className}`}>{children}</div>
      </div>
    </div>
  );
}

// Cada palavra sobe de dentro de uma mascara (efeito editorial). A mascara tem folga vertical
// (padding + margem negativa) para nao cortar acentos nem cedilhas das letras grandes.
export function SectionTitle({ id, children }: { id: string; children: string }) {
  const palavras = children.split(' ');
  return (
    <>
      <h2 id={id} className="titulo-secao mb-[0.1em] text-center leading-[80%] font-bold">
        {palavras.map((palavra, i) => (
          <Fragment key={`${palavra}-${i}`}>
            {i > 0 && ' '}
            <span className="rv-mask -my-[0.18em] inline-block overflow-hidden py-[0.18em] align-bottom">
              <span className="rv-rise inline-block" style={{ '--i': i } as CSSProperties}>
                {palavra}
              </span>
            </span>
          </Fragment>
        ))}
      </h2>
      {/* fio na cor da secao que se abre sob o titulo */}
      <span
        aria-hidden="true"
        className="rv-line mx-auto mb-[1.2em] block h-1 w-24 rounded-full bg-current"
      />
    </>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p
      {...revelar(
        'up',
        1,
        'mb-[1em] text-center text-[1.9em] leading-[140%] max-md:text-[1.4em] max-md:leading-[110%]',
      )}
    >
      {children}
    </p>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-[0.2em] text-left text-[1.4em] leading-[150%] font-bold max-md:text-[1.2em]">
      {children}
    </h3>
  );
}

export function Text({ className = '', ...props }: ComponentProps<'p'>) {
  return <p className={`mb-[0.8em] text-left leading-[165%] ${className}`} {...props} />;
}

export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-start justify-items-center gap-[1.5em] max-md:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:gap-0 [&>div]:text-left">
      {children}
    </div>
  );
}

// A moldura tem tamanho fixo (frameClassName define altura/proporcao), entao o layout nao muda
// quando a imagem lazy carrega. A moldura se abre como uma cortina quando a cena entra (.rv-curtain).
export function DecorativeImage({
  frameClassName = '',
  className = '',
  ...props
}: ComponentProps<'img'> & { frameClassName?: string }) {
  return (
    <div className={`rv-curtain overflow-hidden rounded-xl ${frameClassName}`}>
      <img className={`block h-full w-full object-cover ${className}`} {...props} />
    </div>
  );
}
