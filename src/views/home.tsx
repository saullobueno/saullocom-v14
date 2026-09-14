import portData from '../data/portfolio.json';
import { featuredProjects } from '../data/featuredProjects';
import Header from '../components/header';
import Section from '../components/section';
import Footer from '../components/footer';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from 'react';

import { MdEmail } from 'react-icons/md';
import {
  FaLinkedin,
  FaWhatsappSquare,
  FaGithubSquare,
  FaGithub,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

import Stack01 from '../assets/imageStack01.jpg';
import Stack02 from '../assets/imageStack02.jpg';
import Stack03 from '../assets/imageStack03.jpg';
import Stack04 from '../assets/imageStack04.jpg';

export default function Home() {
  const [index, setIndex] = useState(-1);
  const [showAllLegacy, setShowAllLegacy] = useState(false);

  const slides = portData.map((port) => ({
    src: port.image.slice(0, -4) + '-g.jpg',
    title: port.title,
    description: port.description,
  }));

  return (
    <>
      <Header />

      <main>
        <Section textColor="#E34040">
          <h1>MINEIRO DA GEMA</h1>
          <h2>
            Até os 12 anos, morei no interior de Minas Gerais, em uma pequena cidade chamada Pingo D'Água.
            Ganhei meu primeiro computador logo que me mudei para a capital, iniciando minha paixão por tecnologia.
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
              <h3>Um pouco sobre mim</h3>
              <p>
                Desde criança, sempre gostei de desenhar e esculpir. Ganhei meu primeiro computador aos 13 anos e logo me apaixonei por tecnologia. Comecei explorando as primeiras versões do Windows e já criava interfaces digitais usando o PowerPoint.
              </p>
              <p>
                Após o colégio, realizei diversos cursos de desenvolvimento e design. Atuei em várias empresas da área web e me graduei em 2012.
              </p>
              <p>
                Sempre tive afinidade com o front-end e, com a ascensão do JavaScript em 2015, passei a me interessar também pelas regras de negócio e arquitetura de sistemas.
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

        <Section textColor="#e2a342">
          <h1 style={{ textAlign: 'center' }}>EXPERTISE TÉCNICA</h1>
          <h2 style={{ textAlign: 'center' }}>
            Iniciei minha trajetória como web designer e designer gráfico. Posteriormente, especializei-me no desenvolvimento front-end e hoje foco em soluções Full Stack.
          </h2>

          <div className="columns">
            <div>
              <h3>Design</h3>
              <p>
                Criação de identidades visuais e design de interfaces focados na experiência do usuário (UX/UI).
                <br />
                <small>
                  <em>
                    Ferramentas: Figma, Photoshop, Illustrator e Storybook.
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
                Desenvolvimento de sistemas escaláveis em Node.js com TypeScript, aplicando conceitos de arquitetura limpa, SOLID, APIs RESTful e GraphQL. Gestão de dados com ORMs modernos e bancos de dados SQL/NoSQL.
                <br />
                <small>
                  <em>
                    Ferramentas: Node.js, TypeScript, Fastify/Express, PostgreSQL, Prisma/Drizzle, Docker, Redis e MongoDB.
                  </em>
                </small>
              </p>

              <h3>Front-End</h3>
              <p>
                Criação de SPAs e aplicações web de alta performance com React e TypeScript. Foco em componentização avançada, gestão de estado eficiente e interfaces responsivas.
                <br />
                <small>
                  <em>
                    Ferramentas: React, TypeScript, Vite, Zustand, TanStack Query, Styled Components e Tailwind CSS.
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
                Desenvolvimento mobile multiplataforma com React Native e Expo. Implementação de fluxos complexos de navegação, offline-first e alta fidelidade visual.
                <br />
                <small>
                  <em>
                    Ferramentas: React Native, Expo, TypeScript, React Navigation e Reanimated.
                  </em>
                </small>
              </p>
              <h3>Qualidade e CI/CD</h3>
              <p>
                Garantia de qualidade através de testes automatizados e automação de deploy. Uso de integração contínua para entregas rápidas e seguras em ambiente de produção.
                <br />
                <small>
                  <em>
                    Ferramentas: Vitest/Jest, Playwright, GitHub Actions, Docker e ambientes Cloud (AWS/DigitalOcean).
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

              <h3>Arquitetura e Performance</h3>
              <p>
                Aplicação de Design Patterns e melhores práticas para garantir a escalabilidade e performance do código. Foco em segurança (OWASP), SEO e manutenibilidade a longo prazo.
                <br />
                <small>
                  <em>
                    Ferramentas: Clean Architecture, SOLID, Design Patterns e Performance Optimization.
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

        <Section textColor="#00B259">
          <h1>O QUE FAÇO</h1>
          <h2>
            Tenho expertise para atuar em todas as etapas de um projeto digital: desde a concepção do design e identidade visual até o desenvolvimento do back-end, front-end e mobile.
          </h2>

          <div className="columns">
            <div style={{ textAlign: 'left' }}>
              {/* <FaImage
                size={50}
                style={{ float: 'left', margin: '0 2em 1rem 0' }}
              /> */}
              <div>
                <h3>Identidade Visual</h3>
                <p>
                  Desenvolvimento da identidade visual completa: logos, paletas de cores, tipografias, manuais de marca e materiais de papelaria.
                </p>
              </div>
              {/* <FaPaintBrush
                size={50}
                style={{ float: 'left', margin: '0 2rem 1rem 0' }}
              /> */}
              <div>
                <h3>Design de Interface</h3>
                <p>
                  Design de interfaces para websites, sistemas e aplicativos, sempre com foco na usabilidade e na interação do usuário (UX/UI).
                </p>
              </div>

              <div>
                <h3>Web</h3>
                <p>
                  Desenvolvimento de websites, landing pages, sistemas complexos, dashboards e PWAs, utilizando código limpo, semântico e escalonável, seguindo as melhores práticas do mercado.
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
                <h3>API</h3>
                <p>
                  Desenvolvimento back-end robusto em Node.js (Express/AdonisJS), utilizando bancos de dados como PostgreSQL e MongoDB, sistemas de filas com Redis e containerização com Docker.
                </p>
              </div>

              <div>
                <h3>Aplicativo Mobile</h3>
                <p>
                  Desenvolvimento de aplicativos híbridos e nativos com React Native, publicados nas lojas Google Play e App Store.
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

        <Section textColor="#0085B2">
          <h1>PORTFÓLIO</h1>
          <h2>
            Aplicações web modernas, arquiteturas com inteligência artificial, engenharia de software full-stack e sistemas de alta performance.
          </h2>

          <div className="featured-projects-grid">
            {featuredProjects.map((project) => (
              <div className="featured-card" key={project.slug}>
                <div className="featured-image-container">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="featured-content">
                  <h3 className="featured-title">{project.title}</h3>
                  <div className="featured-subtitle">{project.subtitle}</div>
                  <p className="featured-description">{project.description}</p>

                  <ul className="featured-highlights">
                    {project.highlights.map((highlight, i) => (
                      <li key={i}>{highlight}</li>
                    ))}
                  </ul>

                  <div className="featured-stack">
                    {project.stack.map((tech, i) => (
                      <span className="stack-badge" key={i}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="featured-actions">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-action btn-github"
                    >
                      <FaGithub size={18} /> Repositório GitHub
                    </a>
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-demo"
                      >
                        <FaExternalLinkAlt size={14} /> Demo ao Vivo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="legacy-portfolio-section">
            <h3 className="legacy-heading">Projetos Legados</h3>
            <p className="legacy-subheading">
              Histórico de identidades visuais, websites institucionais e projetos desenvolvidos ao longo da carreira.
            </p>

            <div className="gallery">
              {(showAllLegacy ? portData : portData.slice(0, 4)).map((port, key) => (
                <a
                  key={key}
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setIndex(key);
                  }}
                >
                  <img
                    src={port.image}
                    width="auto"
                    height="auto"
                    alt={port.slug}
                    className="portfolio-mini"
                  />
                </a>
              ))}
            </div>

            <button
              type="button"
              className="legacy-toggle-btn"
              onClick={() => setShowAllLegacy(!showAllLegacy)}
            >
              {showAllLegacy ? (
                <>
                  <FaChevronUp size={14} /> Recolher legados
                </>
              ) : (
                <>
                  <FaChevronDown size={14} /> Ver todos os legados (+{portData.length - 4} projetos)
                </>
              )}
            </button>
          </div>

          <Lightbox
            index={index}
            slides={slides}
            open={index >= 0}
            close={() => setIndex(-1)}
            plugins={[Zoom, Counter, Thumbnails]}
          />
        </Section>

        <Section textColor="#7159c1">
          <h1>CONTATO</h1>
          <h2>
            Tem um projeto em mente ou uma ideia para tirar do papel? Vamos conversar! Entre em contato para tirar dúvidas ou solicitar um orçamento:
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
            <div className="contact-column">
              <div className="contact-item">
                <a
                  href="mailto:saullobueno@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-link"
                >
                  <MdEmail size={40} />
                </a>
                <div className="contact-text">
                  <a href="mailto:saullobueno@gmail.com">saullobueno@gmail.com</a>
                  <a href="mailto:saullo@saullo.com">saullo@saullo.com</a>
                </div>
              </div>

              <div className="contact-item">
                <a
                  href="https://wa.me/351932382207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-icon-link"
                >
                  <FaWhatsappSquare size={40} />
                </a>
                <div className="contact-text">
                  <a
                    href="https://wa.me/351932382207"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +351 932 382 207
                  </a>
                  <a
                    href="https://wa.me/5531988273818"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +55 31 98827.3818
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-column">
              <div className="contact-item">
                <a
                  href="https://linkedin.com/in/saullobueno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-wrapper"
                >
                  <FaLinkedin size={40} />
                  <span>linkedin.com/in/saullobueno</span>
                </a>
              </div>

              <div className="contact-item">
                <a
                  href="https://github.com/saullobueno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-wrapper"
                >
                  <FaGithubSquare size={40} />
                  <span>github.com/saullobueno</span>
                </a>
              </div>
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
