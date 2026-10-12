import logo from '@/assets/logo-vertical.png';

import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <div className="logo">
          <img
            src={logo}
            className="logo"
            alt="Saullo.com"
            width="200px"
            height="auto"
          />
        </div>
        <div className="title">
          <p>
            Olá! Sou o Saullo. Graduado em <br />
            Produção Multimídia, atuo como...
          </p>
          <h1 className="sr-only">Desenvolvedor Full Stack</h1>
          <div className="display title-vertical" aria-hidden="true">
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
          <div className="display title-horizontal" aria-hidden="true">
            DESENVOLVEDOR
            <br />
            FULL STACK
          </div>
          <p>UI/UX Design • Node.js • React • React Native</p>
        </div>
      </Content>
    </Container>
  );
}
