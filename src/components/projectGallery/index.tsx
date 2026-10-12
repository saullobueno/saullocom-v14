import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  onOpenImage: (index: number) => void;
}

const navButton =
  'flex w-8 shrink-0 items-center justify-center rounded-lg bg-white/6 p-0 text-white transition hover:bg-[rgba(0,133,178,0.25)] [&_svg]:pointer-events-none [&_svg]:shrink-0';

export default function ProjectGallery({ images, title, onOpenImage }: ProjectGalleryProps) {
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
    <div className="flex flex-col gap-3 [grid-area:gallery]">
      <button
        type="button"
        className="group block w-full cursor-zoom-in overflow-hidden rounded-xl bg-[#111] p-0 leading-[0]"
        onClick={() => onOpenImage(0)}
        aria-label={`Ampliar imagem principal de ${title}`}
      >
        <img
          src={hero}
          alt={title}
          loading="lazy"
          className="block h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      {thumbnails.length > 0 && (
        <div className="flex items-stretch gap-2">
          {thumbnails.length > 3 && (
            <button
              type="button"
              className={navButton}
              aria-label="Ver miniaturas anteriores"
              onClick={() => scrollThumbnails(-1)}
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          <div
            className="flex snap-x snap-mandatory gap-[0.6rem] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            ref={trackRef}
          >
            {thumbnails.map((src, i) => (
              <button
                key={src}
                type="button"
                data-thumb
                className="basis-[calc((100%-1.2rem)/3)] shrink-0 grow-0 cursor-zoom-in snap-start overflow-hidden rounded-lg border border-white/12 bg-[#111] p-0 leading-[0] transition hover:-translate-y-0.5 hover:border-[#0085b2] max-[520px]:basis-[calc((100%-0.6rem)/2)]"
                onClick={() => onOpenImage(i + 1)}
                aria-label={`Ampliar captura ${i + 2} de ${title}`}
              >
                <img
                  src={src}
                  alt={`${title} - captura de tela`}
                  loading="lazy"
                  className="block aspect-[16/10] w-full object-cover"
                />
              </button>
            ))}
          </div>

          {thumbnails.length > 3 && (
            <button
              type="button"
              className={navButton}
              aria-label="Ver próximas miniaturas"
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
