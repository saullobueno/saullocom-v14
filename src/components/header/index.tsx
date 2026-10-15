import { Fragment } from 'react';

import logo from '@/assets/logo-vertical.png';
import imageHome from '@/assets/image-home.avif';
import { useMessages } from '../../i18n';

const display = 'm-0 py-4 text-center text-white leading-[80%] font-bold';

function Linhas({ linhas }: { linhas: string[] }) {
  return linhas.map((linha, i) => (
    <Fragment key={linha}>
      {i > 0 && <br />}
      {linha}
    </Fragment>
  ));
}

export default function Header() {
  const { hero } = useMessages();

  return (
    <div
      id="top"
      className="relative flex min-h-screen justify-center overflow-hidden motion-safe:animate-hue max-md:items-start max-md:justify-start"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-blend-hard-light"
        style={{
          backgroundImage: `url(${imageHome}), linear-gradient(45deg, #e2a342, #0059b2), linear-gradient(135deg, #e34040, #00b259)`,
        }}
      />
      <div className="hero-conteudo relative z-10 flex h-full w-full max-w-[1280px] shrink items-center justify-around px-8 text-white max-md:flex-col max-md:justify-around max-md:px-0">
        <div>
          <img
            src={logo}
            alt="Saullo.com"
            width="200"
            height="321"
            className="brightness-[500%] max-[667px]:mt-[100px] max-[667px]:max-h-[200px] max-[667px]:w-auto"
          />
        </div>
        <div className="mt-[60px] text-center">
          <p className="m-0 text-center text-[1.2rem] leading-[180%] max-md:text-[0.8rem] max-md:leading-[120%]">
            {hero.greeting}
          </p>
          <h1 className="sr-only">{hero.h1}</h1>
          <div className={`${display} block text-[10rem] max-md:hidden`} aria-hidden="true">
            <Linhas linhas={hero.verticalWords} />
          </div>
          <div className={`${display} hidden text-[2rem] max-md:block`} aria-hidden="true">
            <Linhas linhas={hero.horizontalLines} />
          </div>
          <p className="m-0 text-center text-[1.2rem] leading-[180%] max-md:text-[0.8rem] max-md:leading-[120%]">
            {hero.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}
