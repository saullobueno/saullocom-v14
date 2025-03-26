import { ModalView } from './styles';

interface ModalProps {
  imagemodal: string;
  slug: string;
  title?: string;
  description?: string;
  job?: string;
}

export default function Modal({ imagemodal, slug }: ModalProps) {
  return (
    <ModalView id={slug}>
      <a href={'#_'}>
        <img src={imagemodal} alt={slug} />
      </a>
    </ModalView>
  );
}
