import { lazy, Suspense, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaGithubSquare, FaLinkedin, FaWhatsappSquare } from 'react-icons/fa';

import { getFeaturedProjects } from '../../data/localizedProjects';
import { LocaleProvider, useI18n, type Locale } from '../../i18n';
import Header from '../header';
import Nav from '../nav';
import Section, {
  Columns,
  DecorativeImage,
  SectionLead,
  SectionTitle,
  SubTitle,
  Text,
} from '../section';
import Footer from '../footer';
import FundoCodigo from '../fundoCodigo';
import FeaturedCard from '../featuredCard';
import LegacyGallery from '../legacyGallery';
import { revelar } from '../reveal';

import Stack01 from '../../assets/imageStack01.avif';
import Stack02 from '../../assets/imageStack02.avif';
import Stack03 from '../../assets/imageStack03.avif';
import Stack04 from '../../assets/imageStack04.avif';

const ImageLightbox = lazy(() => import('../lightbox'));

const contactItem = 'mb-6 flex w-full items-center gap-3 text-left';
const contactIcon =
  'flex shrink-0 items-center justify-center text-inherit no-underline transition hover:scale-110 hover:opacity-80';
const contactLink =
  'flex items-center gap-3 text-inherit no-underline transition-opacity hover:underline hover:opacity-80';
const contactText =
  'leading-[1.6] text-inherit no-underline transition-opacity hover:underline hover:opacity-80';

const imagemProps = { loading: 'lazy', decoding: 'async' } as const;

function Pagina() {
  const { locale, t } = useI18n();
  const projects = getFeaturedProjects(locale);
  const [projectGallery, setProjectGallery] = useState<{ slug: string; index: number } | null>(
    null,
  );

  const activeProject = projects.find((project) => project.slug === projectGallery?.slug);
  const projectSlides = (activeProject?.images ?? []).map((src) => ({ src }));

  return (
    <>
      <Nav />
      <FundoCodigo />
      <Header />

      <main id="main" tabIndex={-1} className="relative p-0 outline-none">
        <Section id="about" tone="text-trajetoria">
          <SectionTitle id="about-title">{t.about.title}</SectionTitle>
          <SectionLead>{t.about.lead}</SectionLead>
          <Columns>
            <div className="w-full">
              <DecorativeImage
                src={Stack01}
                width={720}
                height={720}
                alt={t.about.imageAlt}
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
        </Section>

        <Section id="expertise" tone="text-expertise">
          <SectionTitle id="expertise-title">{t.expertise.title}</SectionTitle>
          <SectionLead>{t.expertise.lead}</SectionLead>

          <Columns>
            <div>
              {t.expertise.left.map((item, i) => (
                <div key={item.title} {...revelar('left', i)}>
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
                {...imagemProps}
              />
            </div>
            <div>
              {t.expertise.right.map((item, i) => (
                <div key={item.title} {...revelar('right', i)}>
                  <SubTitle>{item.title}</SubTitle>
                  <Text>{item.text}</Text>
                </div>
              ))}
            </div>
          </Columns>
        </Section>

        <Section id="services" tone="text-oque-faco">
          <SectionTitle id="services-title">{t.services.title}</SectionTitle>
          <SectionLead>{t.services.lead}</SectionLead>

          <Columns>
            <div>
              {t.services.left.map((item, i) => (
                <div key={item.title} {...revelar('left', i)}>
                  <SubTitle>{item.title}</SubTitle>
                  <Text>{item.text}</Text>
                </div>
              ))}
            </div>
            <div>
              {t.services.middle.map((item, i) => (
                <div key={item.title} {...revelar('up', i)}>
                  <SubTitle>{item.title}</SubTitle>
                  <Text>{item.text}</Text>
                </div>
              ))}
            </div>
            <div className="w-full">
              <DecorativeImage
                src={Stack03}
                width={540}
                height={720}
                alt={t.services.imageAlt}
                {...imagemProps}
              />
            </div>
          </Columns>
        </Section>

        <Section id="portfolio" tone="text-portfolio">
          <SectionTitle id="portfolio-title">{t.portfolio.title}</SectionTitle>
          <SectionLead>{t.portfolio.lead}</SectionLead>

          <div className="mt-22 mb-28 flex flex-col gap-30 text-left">
            {projects.map((project) => (
              <FeaturedCard
                key={project.slug}
                project={project}
                onOpenImage={(imageIndex) =>
                  setProjectGallery({ slug: project.slug, index: imageIndex })
                }
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

        <Section id="contact" tone="text-contato">
          <SectionTitle id="contact-title">{t.contact.title}</SectionTitle>
          <SectionLead>{t.contact.lead}</SectionLead>

          <Columns>
            <div className="w-full">
              <DecorativeImage
                src={Stack04}
                width={720}
                height={720}
                alt={t.contact.imageAlt}
                frameClassName="mb-4"
                {...imagemProps}
              />
            </div>
            <div className="flex w-full flex-col items-start justify-start !text-left">
              <div {...revelar('right', 0, contactItem)}>
                <a
                  href="mailto:saullobueno@gmail.com"
                  className={contactIcon}
                  aria-label={t.contact.emailAria}
                >
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

              <div {...revelar('right', 1, contactItem)}>
                <a
                  href="https://wa.me/351932382207"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={contactIcon}
                  aria-label={t.contact.whatsappAria}
                >
                  <FaWhatsappSquare size={40} />
                </a>
                <div className="flex flex-col items-start text-left">
                  <a
                    href="https://wa.me/351932382207"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactText}
                  >
                    +351 932 382 207
                  </a>
                  <a
                    href="https://wa.me/5531988273818"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={contactText}
                  >
                    +55 31 98827.3818
                  </a>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-start !text-left">
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
          </Columns>
        </Section>
      </main>

      <Footer>
        <p>{t.footer.copyright}</p>
      </Footer>
    </>
  );
}

export default function HomePage({ locale }: { locale: Locale }) {
  return (
    <LocaleProvider locale={locale}>
      <Pagina />
    </LocaleProvider>
  );
}
