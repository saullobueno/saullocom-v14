import type { ComponentProps, ReactNode } from 'react';

interface SectionProps {
  /** Cor do texto da secao (token do tema, ex.: 'text-trajetoria') */
  tone: string;
  children: ReactNode;
}

export default function Section({ tone, children }: SectionProps) {
  return (
    <div
      className={`mx-auto w-[1280px] py-32 text-center max-xl:my-8 max-xl:w-[calc(100%-2rem)] ${tone}`}
    >
      <div>{children}</div>
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-8 text-center text-[8rem] leading-[80%] font-bold max-md:text-[clamp(2.5rem,12vw,4rem)]">
      {children}
    </h2>
  );
}

export function SectionLead({ children }: { children: ReactNode }) {
  return (
    <p className="mb-8 text-center text-[2rem] leading-[140%] max-md:text-[1.4rem] max-md:leading-[100%]">
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

export function DecorativeImage(props: ComponentProps<'img'>) {
  return <img className="mx-auto block" {...props} />;
}
