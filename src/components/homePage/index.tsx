import { lazy, Suspense, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithubSquare, FaLinkedin } from 'react-icons/fa';

import type { FeaturedProject } from '../../data/featuredProjects';
import { LocaleProvider, useI18n, type Locale, type Messages } from '../../i18n';
import Header from '../header';
import Nav from '../nav';
import Section, {
  Cena,
  Columns,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  SubTitle,
  Text,
} from '../section';
import Footer from '../footer';
import Palco from '../palco';
import FeaturedCard from '../featuredCard';
import LegacyGallery from '../legacyGallery';
import { revelar } from '../reveal';

import Stack01 from '../../assets/imageStack01.avif';
import Stack02 from '../../assets/imageStack02.avif';
import Stack03 from '../../assets/imageStack03.avif';
import Stack04 from '../../assets/imageStack04.avif';

const ImageLightbox = lazy(() => import('../lightbox'));

const contactItem = 'mb-6 last:mb-0 flex w-full items-center gap-3 text-left';
const contactIcon =
  'flex shrink-0 items-center justify-center text-inherit no-underline transition hover:scale-110 hover:opacity-80';
const contactLink =
  'flex items-center gap-3 text-inherit no-underline transition-opacity hover:underline hover:opacity-80';
const contactText =
  'leading-[1.6] text-inherit no-underline transition-opacity hover:underline hover:opacity-80';

const imagemProps = { loading: 'lazy', decoding: 'async' } as const;

function Pagina({ projects }: { projects: FeaturedProject[] }) {
  const { t } = useI18n();
  const [projectGallery, setProjectGallery] = useState<{ slug: string; index: number } | null>(
    null,
  );

  const activeProject = projects.find((project) => project.slug === projectGallery?.slug);
  const projectSlides = (activeProject?.images ?? []).map((src) => ({ src }));

  return (
    <>
      <Nav />
      <Header />

      <Palco>
        <Section id="about" tone="text-trajetoria">
          <Cena rotulo={t.nav.about}>
            <SectionTitle id="about-title">{t.about.title}</SectionTitle>
            <SectionLead>{t.about.lead}</SectionLead>
            <Columns>
              <div className="w-full">
                <DecorativeImage
                  src={Stack01}
                  width={720}
                  height={720}
                  alt={t.about.imageAlt}
                  frameClassName="mx-auto aspect-square max-h-[34svh] max-md:my-4 max-md:max-h-[20svh]"
                  {...imagemProps}
                />
              </div>
              <div {...revelar('up', 1)}>
                <Text>{t.about.paragraphs[0]}</Text>
                <Text>{t.about.paragraphs[1]}</Text>
              </div>
              <div {...revelar('up', 2)}>
                <Text>{t.about.paragraphs[2]}</Text>
                <Text>{t.about.paragraphs[3]}</Text>
              </div>
            </Columns>
          </Cena>
        </Section>

        <Section id="expertise" tone="text-expertise">
          <Cena rotulo={t.nav.expertise}>
            <SectionTitle id="expertise-title">{t.expertise.title}</SectionTitle>
            <SectionLead>{t.expertise.lead}</SectionLead>

            <Columns>
              <div className="w-full md:[&_*]:!text-right">
                {t.expertise.left.map((item, i) => (
                  <div key={item.title} {...revelar('left', i, 'mb-6 last:mb-0')}>
                    <SubTitle>{item.title}</SubTitle>
                    <Text>{item.text}</Text>
                  </div>
                ))}
              </div>
              <div className="w-full">
                <DecorativeImage
                  src={Stack02}
                  width={540}
                  height={1079}
                  alt={t.expertise.imageAlt}
                  frameClassName="mx-auto aspect-[540/1079] h-[min(46svh,420px)] max-md:hidden"
                  {...imagemProps}
                />
              </div>
              <div>
                {t.expertise.right.map((item, i) => (
                  <div key={item.title} {...revelar('right', i, 'mb-6 last:mb-0')}>
                    <SubTitle>{item.title}</SubTitle>
                    <Text>{item.text}</Text>
                  </div>
                ))}
              </div>
            </Columns>
          </Cena>
        </Section>

        <Section id="services" tone="text-oque-faco">
          <Cena rotulo={t.nav.services}>
            <SectionTitle id="services-title">{t.services.title}</SectionTitle>
            <SectionLead>{t.services.lead}</SectionLead>

            {/* mobile: so o 1o servico (Design & UI/UX) fica ao lado da imagem; os demais usam a largura toda */}
            <div className="grid grid-cols-3 items-start justify-items-center gap-[1.5em] max-md:grid-cols-[1fr_40%] max-md:gap-x-4 max-md:gap-y-6 [&>div]:text-left">
              <div className="max-md:contents">
                {t.services.left.map((item, i) => (
                  <div
                    key={item.title}
                    {...revelar(
                      'left',
                      i,
                      `mb-6 last:mb-0 max-md:mb-0 ${i > 0 ? 'max-md:col-span-2' : ''}`,
                    )}
                  >
                    <SubTitle>{item.title}</SubTitle>
                    <Text>{item.text}</Text>
                  </div>
                ))}
              </div>
              <div className="max-md:contents">
                {t.services.middle.map((item, i) => (
                  <div
                    key={item.title}
                    {...revelar('up', i, `mb-6 last:mb-0 max-md:mb-0 max-md:col-span-2`)}
                  >
                    <SubTitle>{item.title}</SubTitle>
                    <Text>{item.text}</Text>
                  </div>
                ))}
              </div>
              <div className="w-full max-md:col-start-2 max-md:row-start-1 max-md:self-center">
                <DecorativeImage
                  src={Stack03}
                  width={540}
                  height={720}
                  alt={t.services.imageAlt}
                  frameClassName="mx-auto aspect-[3/4] h-[min(40svh,380px)] max-md:h-auto max-md:w-full"
                  {...imagemProps}
                />
              </div>
            </div>
          </Cena>
        </Section>

        <Section id="portfolio" tone="text-portfolio">
          <Cena rotulo={t.nav.portfolio}>
            <SectionTitle id="portfolio-title">{t.portfolio.title}</SectionTitle>
            <SectionLead>{t.portfolio.lead}</SectionLead>
          </Cena>

          {projects.map((project) => (
            <Cena key={project.slug} rotulo={project.title}>
              <FeaturedCard
                project={project}
                onOpenImage={(imageIndex) =>
                  setProjectGallery({ slug: project.slug, index: imageIndex })
                }
              />
            </Cena>
          ))}

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

          <Cena rotulo={t.legacy.title}>
            <LegacyGallery />
          </Cena>
        </Section>

        <Section id="contact" tone="text-contato">
          <Cena rotulo={t.nav.contact}>
            <SectionTitle id="contact-title">{t.contact.title}</SectionTitle>
            <SectionLead>{t.contact.lead}</SectionLead>

            <div className="flex items-center justify-center gap-[3em] max-[500px]:flex-col max-[500px]:gap-0">
              <div className="shrink-0">
                <DecorativeImage
                  src={Stack04}
                  width={720}
                  height={720}
                  alt={t.contact.imageAlt}
                  frameClassName="mx-auto aspect-square h-[34svh] max-md:my-4 max-md:h-[20svh]"
                  {...imagemProps}
                />
              </div>
              <div className="flex flex-col items-start justify-start !text-left">
                <div {...revelar('right', 0, contactItem)}>
                  <a
                    href="mailto:saullo@saullo.com"
                    className={contactIcon}
                    aria-label={t.contact.emailAria}
                  >
                    <MdEmail size={40} />
                  </a>
                  <div className="flex flex-col items-start text-left">
                    <a href="mailto:saullo@saullo.com" className={contactText}>
                      saullo@saullo.com
                    </a>
                  </div>
                </div>
                <div {...revelar('right', 1, contactItem)}>
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

                <div {...revelar('right', 2, contactItem)}>
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
            </div>
          </Cena>
        </Section>
      </Palco>

      <Footer>
        <p>{t.footer.authorship}</p>
        <p>{t.footer.copyright}</p>
      </Footer>
    </>
  );
}

interface HomePageProps {
  locale: Locale;
  /** textos do idioma (cada rota importa so o seu) */
  t: Messages;
  projects: FeaturedProject[];
}

export default function HomePage({ locale, t, projects }: HomePageProps) {
  return (
    <LocaleProvider locale={locale} t={t}>
      <Pagina projects={projects} />
    </LocaleProvider>
  );
}
