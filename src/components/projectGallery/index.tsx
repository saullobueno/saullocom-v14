import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { LARGURA_MINI, miniaturaDe } from '../../data/miniaturas';
import { useMessages } from '../../i18n';
import { abreNoLightbox, linkDaImagem } from '../lightbox/abrir';
import { revelar } from '../reveal';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  onOpenImage: (index: number) => void;
}

// precisa-js: sem JavaScript as setas nao fazem nada e somem (ver o <noscript> em root.tsx)
const navButton =
  'precisa-js flex w-8 shrink-0 items-center justify-center rounded-lg bg-white/6 p-0 text-white transition hover:bg-brand/25 [&_svg]:pointer-events-none [&_svg]:shrink-0';

export default function ProjectGallery({ images, title, onOpenImage }: ProjectGalleryProps) {
  const { gallery } = useMessages();
  const trackRef = useRef<HTMLDivElement>(null);
  const [hero, ...thumbnails] = images;

  const scrollThumbnails = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const thumb = track.querySelector<HTMLElement>('[data-thumb]');
    const gap = 10;
    const step = thumb ? thumb.offsetWidth + gap : track.clientWidth;

    track.scrollBy({ left: direction * step * 3, behavior: 'smooth' });
  };

  return (
    <div {...revelar('left', 0, 'flex flex-col gap-3 [grid-area:gallery]')}>
      <a
        {...linkDaImagem(hero)}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-surface leading-[0]"
        onClick={abreNoLightbox(() => onOpenImage(0))}
        aria-label={gallery.enlargeMain(title)}
      >
        <img
          src={hero}
          srcSet={`${miniaturaDe(hero)} ${LARGURA_MINI}w, ${hero} 1440w`}
          sizes="(max-width: 960px) 92vw, min(34vw, 520px)"
          alt={title}
          loading="lazy"
          className="foto-principal block aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </a>

      {thumbnails.length > 0 && (
        <div className="miniaturas flex items-stretch gap-2">
          {thumbnails.length > 3 && (
            <button
              type="button"
              className={navButton}
              aria-label={gallery.prev}
              onClick={() => scrollThumbnails(-1)}
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          <div
            className="flex min-w-0 flex-1 snap-x snap-mandatory [scrollbar-width:none] gap-[0.6rem] overflow-x-auto [&::-webkit-scrollbar]:hidden"
            ref={trackRef}
          >
            {thumbnails.map((src, i) => (
              <a
                key={src}
                {...linkDaImagem(src)}
                data-thumb
                className="shrink-0 grow-0 basis-[calc((100%-1.2rem)/3)] cursor-zoom-in snap-start overflow-hidden rounded-lg border border-white/12 bg-surface leading-[0] transition hover:-translate-y-0.5 hover:border-brand max-sm:basis-[calc((100%-0.6rem)/2)]"
                onClick={abreNoLightbox(() => onOpenImage(i + 1))}
                aria-label={gallery.enlargeCapture(i + 2, title)}
              >
                <img
                  src={miniaturaDe(src)}
                  alt={gallery.screenshotAlt(title)}
                  loading="lazy"
                  className="block aspect-[16/10] w-full object-cover"
                />
              </a>
            ))}
          </div>

          {thumbnails.length > 3 && (
            <button
              type="button"
              className={navButton}
              aria-label={gallery.next}
              onClick={() => scrollThumbnails(1)}
            >
              <FaChevronRight size={14} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
