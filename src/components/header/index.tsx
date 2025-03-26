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
            Olá, me chamo Saullo, sou graduado em <br />
            Produção Multimídia e atuo na web como...
          </p>
          <h1 className="title-vertical">
            DESEN
            <br />
            VOLVE
            <br />
            DOR
            <br />
            FULL
            <br />
            STACK
          </h1>
          <h1 className="title-horizontal">
            DESENVOLVEDOR
            <br />
            FULL STACK
          </h1>
          <p>Design UI/UX, Node.js, React e React Native</p>
        </div>
      </Content>
    </Container>
  );
}
