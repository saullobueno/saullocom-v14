import { Container } from './styles';

import logo from '@/assets/logo-vertical.png';

interface FooterProps {
  background?: string;
  textColor?: string;
  children?: any;
}

export default function Footer({ background, textColor, children }: FooterProps) {
  return (
    <Container style={{ backgroundColor: background, color: textColor }}>
      <div className="content">
        <img
          src={logo}
          className="logo"
          alt="Saullo.com"
          width="auto"
          height="auto"
        />
        <br />
        {children}
      </div>
    </Container>
  );
}
