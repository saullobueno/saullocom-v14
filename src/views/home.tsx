import { lazy, Suspense, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithubSquare, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';

import { featuredProjects } from '../data/featuredProjects';
import Header from '../components/header';
import Section, {
  Columns,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  SubTitle,
  Text,
} from '../components/section';
import Footer from '../components/footer';
import FeaturedCard from '../components/featuredCard';
import LegacyGallery from '../components/legacyGallery';

import Stack01 from '../assets/imageStack01.avif';
import Stack02 from '../assets/imageStack02.avif';
import Stack03 from '../assets/imageStack03.avif';
import Stack04 from '../assets/imageStack04.avif';

const ImageLightbox = lazy(() => import('../components/lightbox'));

const contactItem = 'mb-6 flex w-full items-center gap-3 text-left';
const contactIcon =
  'flex shrink-0 items-center justify-center text-inherit no-underline transition-opacity hover:opacity-80';
const contactLink =
  'flex items-center gap-3 text-inherit no-underline transition-opacity hover:underline hover:opacity-80';
const contactText = 'leading-[1.6] text-inherit no-underline transition-opacity hover:underline hover:opacity-80';

export default function Home() {
  const [projectGallery, setProjectGallery] = useState<{ slug: string; index: number } | null>(
    null
  );

  const activeProject = featuredProjects.find((project) => project.slug === projectGallery?.slug);
  const projectSlides = (activeProject?.images ?? []).map((src) => ({ src }));

  return (
    <>
      <Header />

      <main className="p-0">
        <Section tone="text-trajetoria">
          <SectionTitle>MINHA TRAJETÓRIA</SectionTitle>
          <SectionLead>
            Descobri a paixão pela tecnologia ao me mudar para a capital e ter acesso ao meu primeiro computador, iniciando uma jornada de constante evolução.
          </SectionLead>
          <Columns>
            <div>
              <DecorativeImage
                src={Stack01}
                width={720}
                height={720}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto' }}
                alt="Criança sentada no chão empilhando blocos de madeira, em tons sépia"
              />
            </div>
            <div>
              <Text>
                Nascido em Pingo D'Água (MG) e criado em Belo Horizonte, desenvolvi minha paixão pela tecnologia e pelo design desde a adolescência, criando minhas primeiras interfaces digitais.
              </Text>
              <Text>
                Graduei-me em Produção Multimídia em 2012 e atuei em diversas empresas do setor, evoluindo do design gráfico e front-end para a engenharia de software Full Stack.
              </Text>
            </div>
            <div>
              <Text>
                Profissional focado em resultados, unindo postura colaborativa, aprendizado contínuo e forte senso de organização.
              </Text>
              <Text>
                Atuação com persistência na resolução de problemas complexos, atenção aos detalhes e compromisso com a qualidade em cada entrega.
              </Text>
            </div>
          </Columns>
        </Section>

        <Section tone="text-expertise">
          <SectionTitle>EXPERTISE TÉCNICA</SectionTitle>
          <SectionLead>
            Trajetória construída no design e UI/UX, consolidada no desenvolvimento front-end e especializada em engenharia de software Full Stack.
          </SectionLead>

          <Columns>
            <div>
              <SubTitle>Design & UI/UX</SubTitle>
              <Text>
                Concepção de interfaces intuitivas e identidades visuais focadas em usabilidade e experiência do usuário.
              </Text>

              <SubTitle>Back-end</SubTitle>
              <Text>
                Desenvolvimento de APIs e serviços escaláveis com foco em Clean Architecture e princípios SOLID.
              </Text>

              <SubTitle>Front-End</SubTitle>
              <Text>
                Criação de SPAs e aplicações web de alta performance com componentes reutilizáveis e telas responsivas.
              </Text>
            </div>
            <div>
              <DecorativeImage
                src={Stack02}
                width={540}
                height={1079}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto' }}
                alt="Torre alta de blocos de madeira equilibrada sobre uma mesa clara"
              />
            </div>
            <div>
              <SubTitle>Mobile</SubTitle>
              <Text>
                Desenvolvimento de aplicativos móveis multiplataforma com alta fidelidade visual e performance.
              </Text>
              <SubTitle>Qualidade & CI/CD</SubTitle>
              <Text>
                Testes automatizados e pipelines de integração contínua para entregas rápidas e seguras.
              </Text>

              <SubTitle>Arquitetura & Performance</SubTitle>
              <Text>
                Aplicação de boas práticas de software para garantir segurança, SEO e alta manutenibilidade.
              </Text>
            </div>
          </Columns>
        </Section>

        <Section tone="text-oque-faco">
          <SectionTitle>O QUE FAÇO</SectionTitle>
          <SectionLead>
            Domínio completo do ciclo de vida de produtos digitais: da concepção de UI/UX e identidade visual ao desenvolvimento Full Stack e mobile.
          </SectionLead>

          <Columns>
            <div>
              <div>
                <SubTitle>Design & UI/UX</SubTitle>
                <Text>
                  Criação de marcas, identidades visuais e interfaces intuitivas para plataformas web e aplicativos móveis.
                </Text>
              </div>

              <div>
                <SubTitle>Aplicações Web</SubTitle>
                <Text>
                  Desenvolvimento de ecossistemas web, dashboards e landing pages com código limpo, rápido e escalável.
                </Text>
              </div>
            </div>
            <div>
              <div>
                <SubTitle>APIs & Back-end</SubTitle>
                <Text>
                  Construção de serviços back-end eficientes, modelagem de dados, mensageria e containerização de aplicações.
                </Text>
              </div>

              <div>
                <SubTitle>Aplicações Mobile</SubTitle>
                <Text>
                  Desenvolvimento e publicação de aplicativos móveis para ecossistemas iOS e Android.
                </Text>
              </div>
            </div>
            <div>
              <DecorativeImage
                src={Stack03}
                width={540}
                height={720}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: 'auto' }}
                alt="Mão afastando com cuidado um bloco de uma torre de madeira, em tons esverdeados"
              />
            </div>
          </Columns>
        </Section>

        <Section tone="text-portfolio">
          <SectionTitle>PORTFÓLIO</SectionTitle>
          <SectionLead>
            Engenharia de software Full Stack, sistemas web modernos, soluções integradas a Inteligência Artificial e aplicações de alta performance.
          </SectionLead>

          <div className="mt-22 mb-28 flex flex-col gap-30 text-left">
            {featuredProjects.map((project) => (
              <FeaturedCard
                key={project.slug}
                project={project}
                onOpenImage={(imageIndex) => setProjectGallery({ slug: project.slug, index: imageIndex })}
              />
            ))}
          </div>

          {projectGallery !== null && (
            <Suspense fallback={null}>
              <ImageLightbox
                open
                index={projectGallery.index}
                slides={projectSlides}
                onClose={() => setProjectGallery(null)}
              />
            </Suspense>
          )}

          <LegacyGallery />
        </Section>

        <Section tone="text-contato">
          <SectionTitle>CONTATO</SectionTitle>
          <SectionLead>
            Tem um projeto para desenvolver, deseja contratar meus serviços ou quer conversar sobre oportunidades? Vamos conversar:
          </SectionLead>

          <Columns>
            <div>
              <DecorativeImage
                src={Stack04}
                width={720}
                height={720}
                loading="lazy"
                decoding="async"
                alt="Mão de pessoa de terno colocando um bloco de madeira no topo de uma torre, em tons arroxeados"
                style={{ width: '100%', height: 'auto', marginBottom: '1rem' }}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start !text-left">
              <div className={contactItem}>
                <a href="mailto:saullobueno@gmail.com" className={contactIcon} aria-label="Enviar e-mail">
                  <MdEmail size={40} />
                </a>
                <div className="flex flex-col items-start text-left">
                  <a href="mailto:saullobueno@gmail.com" className={contactText}>
                    saullobueno@gmail.com
                  </a>
                  <a href="mailto:saullo@saullo.com" className={contactText}>
                    saullo@saullo.com
                  </a>
                </div>
              </div>

              <div className={contactItem}>
                <a
                  href="https://wa.me/351932382207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactIcon}
                  aria-label="Conversar no WhatsApp"
                >
                  <FaWhatsappSquare size={40} />
                </a>
                <div className="flex flex-col items-start text-left">
                  <a href="https://wa.me/351932382207" target="_blank" rel="noopener noreferrer" className={contactText}>
                    +351 932 382 207
                  </a>
                  <a href="https://wa.me/5531988273818" target="_blank" rel="noopener noreferrer" className={contactText}>
                    +55 31 98827.3818
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-start !text-left">
              <div className={contactItem}>
                <a
                  href="https://linkedin.com/in/saullobueno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLink}
                >
                  <FaLinkedin size={40} className="shrink-0" />
                  <span>linkedin.com/in/saullobueno</span>
                </a>
              </div>

              <div className={contactItem}>
                <a
                  href="https://github.com/saullobueno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactLink}
                >
                  <FaGithubSquare size={40} className="shrink-0" />
                  <span>github.com/saullobueno</span>
                </a>
              </div>
            </div>
          </Columns>
        </Section>
      </main>

      <Footer>
        <p>© saullo.com • Todos os direitos reservados</p>
      </Footer>
    </>
  );
}
