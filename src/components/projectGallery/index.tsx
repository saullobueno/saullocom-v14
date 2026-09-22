import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface ProjectGalleryProps {
  images: string[];
  title: string;
  onOpenImage: (index: number) => void;
}

export default function ProjectGallery({ images, title, onOpenImage }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hero, ...thumbnails] = images;

  const scrollThumbnails = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const thumb = track.querySelector<HTMLElement>('.project-thumb');
    const gap = 10;
    const step = thumb ? thumb.offsetWidth + gap : track.clientWidth;

    track.scrollBy({ left: direction * step * 3, behavior: 'smooth' });
  };

  return (
    <div className="project-gallery">
      <button
        type="button"
        className="project-gallery-hero"
        onClick={() => onOpenImage(0)}
        aria-label={`Ampliar imagem principal de ${title}`}
      >
        <img src={hero} alt={title} loading="lazy" />
      </button>

      {thumbnails.length > 0 && (
        <div className="project-thumbnails">
          {thumbnails.length > 3 && (
            <button
              type="button"
              className="thumb-nav thumb-nav-prev"
              aria-label="Ver miniaturas anteriores"
              onClick={() => scrollThumbnails(-1)}
            >
              <FaChevronLeft size={14} />
            </button>
          )}

          <div className="project-thumbnails-track" ref={trackRef}>
            {thumbnails.map((src, i) => (
              <button
                key={src}
                type="button"
                className="project-thumb"
                onClick={() => onOpenImage(i + 1)}
                aria-label={`Ampliar captura ${i + 2} de ${title}`}
              >
                <img src={src} alt={`${title} - captura de tela`} loading="lazy" />
              </button>
            ))}
          </div>

          {thumbnails.length > 3 && (
            <button
              type="button"
              className="thumb-nav thumb-nav-next"
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
