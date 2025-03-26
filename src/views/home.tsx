import portData from '../data/portfolio.json';

import Header from '../components/header';
import Section from '../components/section';
import Footer from '../components/footer';
import ModalView from '../components/modal';

import { MdEmail } from 'react-icons/md';
import {
  FaLinkedin,
  FaWhatsappSquare,
  FaGithubSquare,
  FaDribbbleSquare,
} from 'react-icons/fa';

import Stack01 from '../assets/imageStack01.jpg';
import Stack02 from '../assets/imageStack02.jpg';
import Stack03 from '../assets/imageStack03.jpg';
import Stack04 from '../assets/imageStack04.jpg';

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Section background="#333" textColor="#E34040">
          <h1>MINEIRO DA GEMA</h1>
          <h2>
            Morei no interior até os 12 anos em uma cidadezinha chamada Pingo
            D'Água e ganhei o primeiro computador logo ao mudar para a capital.
          </h2>
          <div className="columns">
            <div>
              <img
                src={Stack01}
                width="100%"
                height="auto"
                alt="Foto Saullo"
                style={{ marginBottom: '1rem' }}
              />
            </div>
            <div>
              <h3>Um pouco sobre mim: </h3>
              <p>
                Gostava de desenhar e esculpir desde criança. Ganhei o primeiro
                computador aos 13 anos, tomei gosto pela tecnologia e fiz cursos
                na área. Conheci as primeiras versões do Windows e brincava de
                fazer interfaces digitais no Power Point.
              </p>
              <p>
                Após o colégio fiz diversos cursos voltados para desenvolvimento
                e design. Trabalhei com web em diversas empresas e me graduei em
                2012.
              </p>
              <p>
                Sempre gostei do lado cliente no desenvolvimento web e, com o
                "boom" do JavaScript em 2015, passei a curtir também as regras
                de negócio por trás dos sistemas.
              </p>
            </div>
            <div>
              <p>
                <strong>Principais características interpessoais:</strong>
              </p>
              <ul>
                <li>Ama o que faz</li>
                <li>Busca aprender mais o tempo todo</li>
                <li>Gosta de compartilhar o que sabe</li>
                <li>Satisfação em colaborar com a equipe</li>
                <li>Senso organizacional natural</li>
                <li>Respeita quem compartilha o mesmo ambiente</li>
                <li>Persistente em resolver problemas que aparecem</li>
                <li>Caçador de detalhes que fazem a diferença</li>
              </ul>
              <p>E procurando aprender e evoluir mais...</p>
            </div>
          </div>
        </Section>

        <Section background="#333" textColor="#e2a342">
          <h1 style={{ textAlign: 'center' }}>QUE MANJA DE</h1>
          <h2 style={{ textAlign: 'center' }}>
            Comecei como webdesigner e designer Gráfico, me dediquei a área web,
            me tornei desenvolvedor front-end e venho focando em desenvolvimento
            full stack.
          </h2>

          <div className="columns">
            <div>
              <h3>Design</h3>
              <p>
                Trabalho a criação da identidade visual e design de interfaces
                focada na experiência do usuário.
                <br />
                <small>
                  <em>
                    Ferramentas: Figma, Adobe XD, Photoshop e Illustrator.
                  </em>
                </small>
              </p>
              {/* <div className="icons">
                <SVGPhotoshop width={50} height={50} />
                <SVGAdobeXD width={50} height={50} />
                <SVGIllustrator width={50} height={50} />
              </div> */}

              <h3>Back-end</h3>
              <p>
                Desenvolvimento em Node.js aplicando os conceitos de API REST,
                autenticação JWT, componentes de envio de emails, filas, bancos
                não relacionais e relacionamentos avançados no SQL.
                <br />
                <small>
                  <em>
                    Ferramentas: Node.js, Express, Nodemon, Insomnia,
                    PostgreSQL, Sequelize, Sucrase, Docker, ESLint, Prettier,
                    Bcrypt, JWT, MongoDB, date-fns, Mongoose, Nodemailer, Redis,
                    Bee Queue, Sentry, DotEnv, entre outras.
                  </em>
                </small>
              </p>

              <h3>Front-End</h3>
              <p>
                Projetos ReactJS responsivos e componentizados, com consumo de
                API e arquitetura Flux com Redux.
                <br />
                <small>
                  <em>
                    Ferramentas: React Router DOM, ESLint, Prettier, Styled
                    Components, Axios, PropTypes, React Hooks, Redux, Redux
                    Saga, Redux Persist, Immer, Polished, Yup
                  </em>
                </small>
              </p>
              {/* <div className="icons">
                <FaNodeJs size={50} />
                <SVGExpressJS width={50} height={50} />
                <DiMongodb size={50} />
                <SVGMongoose width={50} height={50} />
                <DiPostgresql size={50} />
                <SVGSequelize width={50} height={50} />
                <DiRedis size={50} />
                <FaDocker size={50} />
                <SVGAdonis width={50} height={50} />
              </div> */}
            </div>
            <div>
              {/* <div className="icons">
                <FaHtml5 size={50} />
                <FaCss3Alt size={50} />
                <FaBootstrap size={50} />
                <SVGStyled width={50} height={50} />
                <FaJs size={50} />
                <SVGES6 width={50} height={50} />
                <FaReact size={50} />
                <SVGRedux width={50} height={50} />
                <SVGReduxSaga width={50} height={50} />
              </div> */}

              <img
                src={Stack02}
                width="100%"
                height="auto"
                alt="Foto Saullo"
                style={{ marginBottom: '1rem' }}
              />

              {/* <div className="icons">
                <SVGStyled width={50} height={50} />
                <FaJs size={50} />
                <FaReact size={50} />
                <SVGRedux width={50} height={50} />
                <SVGReduxSaga width={50} height={50} />
              </div> */}
            </div>
            <div>
              <h3>Mobile</h3>
              <p>
                Desenvolvimento com React Native para apps Android e iOS
                utilizando conceitos de navegação, arquitetura FLux estilização,
                consumo de API e acessibilidade.
                <br />
                <small>
                  <em>
                    Ferramentas: ReactNavigation, Styled Components, Axios,
                    Redux, Redux Saga, React Hooks, Reactotron, Async Storage,
                    React Native, Gesture Handler
                  </em>
                </small>
              </p>
              <h3>Testes e Deploy</h3>
              <p>
                Aplicações com testes automatizados com TDD no Node.js. No
                deploy com as melhores práticas, serviços de hospedagem e
                integração contínua. Publicação no Google Play Store e Apple
                Store com CodePush para a entrega contínua.
                <br />
                <small>
                  <em>
                    Ferramentas: Jest, Faker, Supertest, DigitalOcean, GitHub,
                    PM2, Buddy, etc.
                  </em>
                </small>
              </p>
              {/* <div className="icons">
                <FaJs size={50} />
                <SVGES6 width={50} height={50} />
                <FaReact size={50} />
                <FaGithub size={50} />
                <SVGJest width={50} height={50} />
              </div> */}

              <h3>Patterns e Segurança Node.js</h3>
              <p>
                Patterns e melhores práticas para garantir a mantenabilidade e
                performance no código. Proteção contra ataques, limite de
                acessos indesejados e dependências atualizadas.
                <br />
                <small>
                  <em>
                    Ferramentas: Cache, Service Pattern, CORS, Express Brute,
                    Express Rate Limit e Helmet.
                  </em>
                </small>
              </p>
              {/*<div className="icons">
                <FaJs size={50} />
                <SVGES6 width={50} height={50} />
                <FaNodeJs size={50} />
                <SVGExpressJS width={50} height={50} />
                <FaReact size={50} />
                <FaGithub size={50} />

                 <SVGPWA width={50} height={50} />
                <SVGNext width={50} height={50} />
                <SVGSaaS width={50} height={50} />
              </div> */}
            </div>
          </div>
        </Section>

        <Section background="#333" textColor="#00B259">
          <h1>SABE FAZER</h1>
          <h2>
            Sou capaz de participar de um projeto web do início à entrega. Do
            design ao desenvolvimento das regras de negócio por trás do sistema,
            até a navegação front end e mobile.
          </h2>

          <div className="columns">
            <div style={{ textAlign: 'left' }}>
              {/* <FaImage
                size={50}
                style={{ float: 'left', margin: '0 2em 1rem 0' }}
              /> */}
              <div>
                <h3>Identidade Visual </h3>
                <p>
                  Criação do conjunto de elementos formais que representam
                  visualmente um nome, ideia, produto, empresa, instituição ou
                  serviço. Entre eles: logo, paleta de cores, tipografias,
                  manual, papelaria, etc.
                </p>
              </div>
              {/* <FaPaintBrush
                size={50}
                style={{ float: 'left', margin: '0 2rem 1rem 0' }}
              /> */}
              <div>
                <h3>Design de Interface </h3>
                <p>
                  Criação visual de websites, aplicações, sistemas, softwares e
                  aplicativos móveis com o foco na experiência dos utilizadores
                  e sua interação.
                </p>
              </div>

              <div>
                <h3>Web </h3>
                <p>
                  Desenvolvimento de websites, hotsites, landing pages,
                  sistemas, dashboards, Progressive Web Apps, Single Page
                  Application e Plataformas SaaS, com código limpo, semântico,
                  boas práticas, componentizado, responsivo e escalonável, com
                  integração e entrega contínua.
                </p>
              </div>
            </div>
            <div>
              {/* <MdWeb
                size={50}
                style={{ float: 'left', margin: '0 2rem 1rem 0' }}
              /> */}
              {/* <FaDatabase
                size={50}
                style={{ float: 'left', margin: '0 2rem 1rem 0' }}
              /> */}
              <div>
                <h3>API </h3>
                <p>
                  Desenvolvimento backend das regras de negócio por trás de
                  projetos que disponibilizam APIs para sistemas e web sites,
                  realizado em Node.js com Express ou AdonisJS, com banco de
                  dados em MongoDB com Mongoose, PostgreSQL com Sequelize e
                  filas com Redis, além de Docker para os containers.
                </p>
              </div>

              <div>
                <h3>Aplicativo Mobile </h3>
                <p>
                  Desenvolvimento de aplicativos para smartphones e outros
                  dispositivos móveis publicado nas stores tanto para Android no
                  Google Play quanto para IOS no Apple Store, de forma nativa em
                  um único projeto dutlizando ReactNative.
                </p>
              </div>
            </div>
            <div>
              {/* <FaMobileAlt
                size={50}
                style={{ float: 'left', margin: '0 2rem 1rem 0' }}
              /> */}

              <img
                src={Stack03}
                width="100%"
                height="auto"
                alt="Foto Saullo"
                style={{ marginBottom: '1rem' }}
              />
            </div>
          </div>
        </Section>

        <Section background="#333" textColor="#0085B2">
          <h1>E JÁ FEZ</h1>
          <h2>
            Trabalhos realizados nos mais variados segmentos. Projetos online,
            offline, identidade visual e papelaria. Suporte, atualização e
            manutenção em todos os projetos realizados.
          </h2>

          <p></p>

          <div className="gallery">
            {portData.map((port, key) => (
              <>
                <a href={'#' + port.slug}>
                  <img
                    src={port.image}
                    key={key}
                    width="auto"
                    height="auto"
                    alt={port.slug}
                    className="portfolio-mini"
                  />
                </a>
                <ModalView
                  imagemodal={port.image.slice(0, -4) + '-g.jpg'}
                  slug={port.slug}
                ></ModalView>
              </>
            ))}
          </div>
        </Section>

        <Section background="#333" textColor="#7159c1">
          <h1>FALA CMG</h1>
          <h2>
            Tem uma ideia nova? Quer concretizar algum projeto em mente? Entre
            em contato e vamos conversar. Tire dúvidas e solicite orçamento:
          </h2>

          <div className="columns">
            <div>
              <img
                src={Stack04}
                width="100%"
                height="auto"
                alt="Foto Saullo"
                style={{ marginBottom: '1rem' }}
              />
            </div>
            <div>
              <p className="center-horizontal">
                <MdEmail size={50} /> saullo@saullo.com
              </p>

              <p className="center-horizontal">
                <FaWhatsappSquare size={50} /> 31 98827.3818
              </p>
            </div>

            <div>
              <p className="center-horizontal">
                <FaLinkedin size={50} /> linkedin.com/in/saullobueno
              </p>

              <p className="center-horizontal">
                <FaGithubSquare size={50} /> github.com/saullobueno
              </p>

              <p className="center-horizontal">
                <FaDribbbleSquare size={50} /> dribbble.com/saullobueno
              </p>
            </div>
          </div>
        </Section>
      </main>

      <Footer>
        <p>Copyright © saullo.com</p>
      </Footer>
    </>
  );
}
