import { lazy, Suspense, useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { legacyProjects } from '../../data/legacyProjects';
import { useMessages } from '../../i18n';
import { revelar } from '../reveal';

const ImageLightbox = lazy(() => import('../lightbox'));

const VISIVEIS = 4;

const slides = legacyProjects.map((port) => ({
  src: port.imageLarge,
  title: port.title,
  description: port.description,
}));

export default function LegacyGallery() {
  const { legacy } = useMessages();
  const [index, setIndex] = useState(-1);
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="legacy-galeria mt-16 pt-12 text-center">
      <h3 {...revelar('up', 0, 'mb-2 text-center text-[1.6rem] text-portfolio')}>{legacy.title}</h3>
      <p {...revelar('up', 1, 'mb-8 text-center text-base text-portfolio')}>{legacy.lead}</p>

      <div
        className={`grid grid-cols-4 gap-4 max-xl:grid-cols-3 max-md:grid-cols-2 ${showAll ? 'lista-rolavel' : ''}`}
      >
        {(showAll ? legacyProjects : legacyProjects.slice(0, VISIVEIS)).map((port, key) => (
          <button
            key={port.slug}
            type="button"
            {...revelar(
              'up',
              key % 4,
              'group cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 leading-[0]',
            )}
            aria-label={legacy.enlarge(port.title)}
            onClick={() => setIndex(key)}
          >
            <img
              src={port.image}
              width={port.width}
              height={port.height}
              alt={port.title}
              loading="lazy"
              decoding="async"
              className="mx-auto block h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      <div {...revelar('up', 6, 'mt-8')}>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[30px] border border-brand/30 bg-brand/10 px-8 py-[0.8rem] text-base font-semibold text-portfolio transition hover:-translate-y-0.5 hover:border-brand hover:bg-brand/25 hover:text-white [&_svg]:m-2.5"
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
        >
          {showAll ? (
            <>
              <FaChevronUp size={14} /> {legacy.collapse}
            </>
          ) : (
            <>
              <FaChevronDown size={14} /> {legacy.showAll(legacyProjects.length - VISIVEIS)}
            </>
          )}
        </button>
      </div>

      {index >= 0 && (
        <Suspense fallback={null}>
          <ImageLightbox open index={index} slides={slides} onClose={() => setIndex(-1)} />
        </Suspense>
      )}
    </div>
  );
}
