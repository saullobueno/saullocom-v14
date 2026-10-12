import { lazy, Suspense, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { legacyProjects } from '../../data/legacyProjects';

const ImageLightbox = lazy(() => import('../lightbox'));

const VISIVEIS = 4;

const slides = legacyProjects.map((port) => ({
  src: port.imageLarge,
  title: port.title,
  description: port.description,
}));

export default function LegacyGallery() {
  const [index, setIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="mt-16 pt-12 text-center">
      <h3 className="mb-2 text-center text-[1.6rem] text-portfolio">Projetos Legados</h3>
      <p className="mb-8 text-center text-base text-portfolio">
        Histórico de identidades visuais, plataformas institucionais e projetos desenvolvidos ao
        longo da trajetória profissional.
      </p>

      <div className="grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-[900px]:grid-cols-2">
        {(showAll ? legacyProjects : legacyProjects.slice(0, VISIVEIS)).map((port, key) => (
          <button
            key={port.slug}
            type="button"
            className="cursor-zoom-in border-0 bg-transparent p-0 leading-[0]"
            aria-label={`Ampliar projeto ${port.title}`}
            onClick={() => setIndex(key)}
          >
            <img
              src={port.image}
              width={port.width}
              height={port.height}
              alt={port.title}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full"
            />
          </button>
        ))}
      </div>

      <button
        type="button"
        className="mt-8 inline-flex items-center gap-2 rounded-[30px] border border-[rgba(0,133,178,0.3)] bg-[rgba(0,133,178,0.1)] px-8 py-[0.8rem] text-base font-semibold text-portfolio transition hover:-translate-y-0.5 hover:border-[#0085b2] hover:bg-[rgba(0,133,178,0.25)] hover:text-white [&_svg]:m-2.5"
        onClick={() => setShowAll(!showAll)}
        aria-expanded={showAll}
      >
        {showAll ? (
          <>
            <FaChevronUp size={14} /> Recolher legados
          </>
        ) : (
          <>
            <FaChevronDown size={14} /> Ver todos os legados (+{legacyProjects.length - VISIVEIS}{' '}
            projetos)
          </>
        )}
      </button>

      {index >= 0 && (
        <Suspense fallback={null}>
          <ImageLightbox open index={index} slides={slides} onClose={() => setIndex(-1)} />
        </Suspense>
      )}
    </div>
  );
}
