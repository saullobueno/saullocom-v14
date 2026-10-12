import logo from '@/assets/logo-vertical.png';
import imageHome from '@/assets/image-home.avif';

const display = 'm-0 py-4 text-center text-white leading-[80%] font-bold';

export default function Header() {
  return (
    <div
      className="flex min-h-screen justify-center bg-cover bg-blend-hard-light motion-safe:animate-hue max-md:items-start max-md:justify-start"
      style={{
        backgroundImage: `url(${imageHome}), linear-gradient(45deg, #e2a342, #0059b2), linear-gradient(135deg, #e34040, #00b259)`,
      }}
    >
      <div className="flex h-full w-full max-w-[1280px] shrink items-center justify-around px-8 text-white max-md:flex-col max-md:justify-around max-md:px-0">
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
            Olá! Sou o Saullo. Graduado em <br />
            Produção Multimídia, atuo como...
          </p>
          <h1 className="sr-only">Desenvolvedor Full Stack</h1>
          <div className={`${display} block text-[10rem] max-md:hidden`} aria-hidden="true">
            DESEN
            <br />
            VOLVE
            <br />
            DOR
            <br />
            FULL
            <br />
            STACK
          </div>
          <div className={`${display} hidden text-[2rem] max-md:block`} aria-hidden="true">
            DESENVOLVEDOR
            <br />
            FULL STACK
          </div>
          <p className="m-0 text-center text-[1.2rem] leading-[180%] max-md:text-[0.8rem] max-md:leading-[120%]">
            UI/UX Design • Node.js • React • React Native
          </p>
        </div>
      </div>
    </div>
  );
}
