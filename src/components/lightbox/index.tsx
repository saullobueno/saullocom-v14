import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface ImageLightboxProps {
  open: boolean;
  index: number;
  slides: { src: string; title?: string; description?: string }[];
  onClose: () => void;
}

// Carregado sob demanda (React.lazy): lightbox + plugins + CSS so baixam no primeiro clique.
export default function ImageLightbox({ open, index, slides, onClose }: ImageLightboxProps) {
  return (
    <Lightbox
      open={open}
      index={index}
      slides={slides}
      close={onClose}
      plugins={[Zoom, Counter, Thumbnails]}
    />
  );
}
