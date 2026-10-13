import type { ReactNode } from 'react';

import logo from '@/assets/logo-vertical.png';
import { revelar } from '../reveal';

export default function Footer({ children }: { children?: ReactNode }) {
  return (
    <footer className="relative flex items-center justify-center bg-footer">
      <div {...revelar('up', 0, 'w-full max-w-[1280px] px-8 pt-12 pb-20 text-center')}>
        <img
          src={logo}
          alt="Saullo.com"
          width="30"
          height="48"
          className="mx-auto w-[30px] brightness-[100]"
        />
        <br />
        <div className="text-[10px] text-[#9a9a9a] [&_p]:m-2 [&_p]:text-[10px] [&_p]:leading-[180%]">
          {children}
        </div>
      </div>
    </footer>
  );
}
