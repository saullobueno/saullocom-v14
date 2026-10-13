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
      className={`mx-auto w-[1280px] scroll-mt-16 overflow-x-clip py-32 text-center max-xl:my-8 max-xl:w-[calc(100%-2rem)] ${tone}`}
    >
      <div>{children}</div>
    </section>
  );
}

// Cada palavra sobe de dentro de uma mascara (efeito editorial). A mascara tem folga vertical
// (padding + margem negativa) para nao cortar acentos nem cedilhas das letras grandes.
export function SectionTitle({ id, children }: { id: string; children: string }) {
  const palavras = children.split(' ');
  return (
    <>
      <h2
        id={id}
        className="mb-6 text-center text-[8rem] leading-[80%] font-bold max-md:text-[clamp(2.5rem,12vw,4rem)]"
      >
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
        className="rv-line mx-auto mb-8 block h-1 w-24 rounded-full bg-current"
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
        'mb-8 text-center text-[2rem] leading-[140%] max-md:text-[1.4rem] max-md:leading-[100%]',
      )}
    >
      {children}
    </p>
  );
}

export function SubTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-[0.2rem] text-center text-[1.4rem] leading-[180%] font-bold max-md:text-[1.2rem]">
      {children}
    </h3>
  );
}

export function Text({ className = '', ...props }: ComponentProps<'p'>) {
  return <p className={`mb-4 text-center leading-[180%] ${className}`} {...props} />;
}

export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-center justify-items-center gap-8 max-md:grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:gap-0 [&>div]:text-center">
      {children}
    </div>
  );
}

// A moldura reserva a proporcao da imagem (aspect-ratio), entao o layout nao muda quando a imagem
// lazy carrega. A imagem se move dentro dela enquanto rola (.parallax-img) e a moldura se abre
// como uma cortina quando entra na tela (.rv-curtain).
export function DecorativeImage({
  frameClassName = '',
  className = '',
  width,
  height,
  ...props
}: ComponentProps<'img'> & { frameClassName?: string }) {
  return (
    <div
      className={`rv-curtain w-full overflow-hidden ${frameClassName}`}
      style={{ aspectRatio: width && height ? `${width} / ${height}` : undefined }}
    >
      <img
        className={`parallax-img block h-full w-full object-cover ${className}`}
        width={width}
        height={height}
        {...props}
      />
    </div>
  );
}
