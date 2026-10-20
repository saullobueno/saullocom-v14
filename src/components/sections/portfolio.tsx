import { lazy, Suspense, useState } from 'react';

import type { FeaturedProject } from '../../data/featuredProjects';
import { useMessages } from '../../i18n';
import FeaturedCard from '../featuredCard';
import LegacyGallery from '../legacyGallery';
import Section, { Cena, SectionLead, SectionTitle } from '../section';

const ImageLightbox = lazy(() => import('../lightbox'));

// Abertura da secao, uma cena por projeto em destaque e, por fim, a galeria dos projetos legados
export default function Portfolio({ projects }: { projects: FeaturedProject[] }) {
  const { nav, portfolio, legacy } = useMessages();
  const [galeria, setGaleria] = useState<{ slug: string; index: number } | null>(null);

  const ativo = projects.find((project) => project.slug === galeria?.slug);
  const slides = (ativo?.images ?? []).map((src) => ({ src }));

  return (
    <Section id="portfolio" tone="text-portfolio">
      <Cena rotulo={nav.portfolio}>
        <SectionTitle id="portfolio-title">{portfolio.title}</SectionTitle>
        <SectionLead>{portfolio.lead}</SectionLead>
      </Cena>

      {projects.map((project) => (
        <Cena key={project.slug} rotulo={project.title}>
          <FeaturedCard
            project={project}
            onOpenImage={(index) => setGaleria({ slug: project.slug, index })}
          />
        </Cena>
      ))}

      {galeria !== null && (
        <Suspense fallback={null}>
          <ImageLightbox
            open
            index={galeria.index}
            slides={slides}
            onClose={() => setGaleria(null)}
          />
        </Suspense>
      )}

      <Cena rotulo={legacy.title}>
        <LegacyGallery />
      </Cena>
    </Section>
  );
}
