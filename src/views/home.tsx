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
          <h1>MINHA TRAJETÓRIA</h1>
          <h2>
            Descobri a paixão pela tecnologia ao me mudar para a capital e ter acesso ao meu primeiro computador, iniciando uma jornada de constante evolução.
          </h2>
          <div className="columns">
            <div>
              <img
                src={Stack01}
                width="100%"
                height="auto"
                alt="Foto Saullo"
              />
            </div>
            <div>
              <p>
                Nascido em Pingo D'Água (MG) e criado em Belo Horizonte, desenvolvi minha paixão pela tecnologia e pelo design desde a adolescência, criando minhas primeiras interfaces digitais.
              </p>
              <p>
                Graduei-me em Produção Multimídia em 2012 e atuei em diversas empresas do setor, evoluindo do design gráfico e front-end para a engenharia de software Full Stack.
              </p>
            </div>
            <div>
              <p>
                Profissional focado em resultados, unindo postura colaborativa, aprendizado contínuo e forte senso de organização.
              </p>
              <p>
                Atuação com persistência na resolução de problemas complexos, atenção aos detalhes e compromisso com a qualidade em cada entrega.
              </p>
            </div>
          </div>
        </Section>

        <Section textColor="#e2a342">
          <h1 style={{ textAlign: 'center' }}>EXPERTISE TÉCNICA</h1>
          <h2 style={{ textAlign: 'center' }}>
            Trajetória construída no design e UI/UX, consolidada no desenvolvimento front-end e especializada em engenharia de software Full Stack.
          </h2>

          <div className="columns">
            <div>
              <h3>Design & UI/UX</h3>
              <p>
                Concepção de interfaces intuitivas e identidades visuais focadas em usabilidade e experiência do usuário.
              </p>

              <h3>Back-end</h3>
              <p>
                Desenvolvimento de APIs e serviços escaláveis com foco em Clean Architecture e princípios SOLID.
              </p>

              <h3>Front-End</h3>
              <p>
                Criação de SPAs e aplicações web de alta performance com componentes reutilizáveis e telas responsivas.
              </p>
            </div>
            <div>
              <img
                src={Stack02}
                width="100%"
                height="auto"
                alt="Foto Saullo"
              />
            </div>
            <div>
              <h3>Mobile</h3>
              <p>
                Desenvolvimento de aplicativos móveis multiplataforma com alta fidelidade visual e performance.
              </p>
              <h3>Qualidade & CI/CD</h3>
              <p>
                Testes automatizados e pipelines de integração contínua para entregas rápidas e seguras.
              </p>

              <h3>Arquitetura & Performance</h3>
              <p>
                Aplicação de boas práticas de software para garantir segurança, SEO e alta manutenibilidade.
              </p>
            </div>
          </div>
        </Section>

        <Section textColor="#00B259">
          <h1>O QUE FAÇO</h1>
          <h2>
            Domínio completo do ciclo de vida de produtos digitais: da concepção de UI/UX e identidade visual ao desenvolvimento Full Stack e mobile.
          </h2>

          <div className="columns">
            <div style={{ textAlign: 'left' }}>
              <div>
                <h3>Design & UI/UX</h3>
                <p>
                  Criação de marcas, identidades visuais e interfaces intuitivas para plataformas web e aplicativos móveis.
                </p>
              </div>

              <div>
                <h3>Aplicações Web</h3>
                <p>
                  Desenvolvimento de ecossistemas web, dashboards e landing pages com código limpo, rápido e escalável.
                </p>
              </div>
            </div>
            <div>
              <div>
                <h3>APIs & Back-end</h3>
                <p>
                  Construção de serviços back-end eficientes, modelagem de dados, mensageria e containerização de aplicações.
                </p>
              </div>

              <div>
                <h3>Aplicações Mobile</h3>
                <p>
                  Desenvolvimento e publicação de aplicativos móveis para ecossistemas iOS e Android.
                </p>
              </div>
            </div>
            <div>
              <img
                src={Stack03}
                width="100%"
                height="auto"
                alt="Foto Saullo"
              />
            </div>
          </div>
        </Section>

        <Section textColor="#0085B2">
          <h1>PORTFÓLIO</h1>
          <h2>
            Engenharia de software Full Stack, sistemas web modernos, soluções integradas a Inteligência Artificial e aplicações de alta performance.
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
                        <FaExternalLinkAlt size={14} /> {project.demoUrlLabel || 'Demo ao Vivo'}
                      </a>
                    )}
                    {project.demoMobileUrl && (
                      <a
                        href={project.demoMobileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-action btn-demo"
                      >
                        <FaExternalLinkAlt size={14} /> {project.demoMobileUrlLabel || 'Demo Mobile'}
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
              Histórico de identidades visuais, plataformas institucionais e projetos desenvolvidos ao longo da trajetória profissional.
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
            Tem um projeto para desenvolver, deseja contratar meus serviços ou quer conversar sobre oportunidades? Vamos conversar:
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
        <p>© saullo.com • Todos os direitos reservados</p>
      </Footer>
    </>
  );
}
