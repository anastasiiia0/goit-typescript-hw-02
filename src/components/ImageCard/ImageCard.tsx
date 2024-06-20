import css from './ImageCard.module.css';
import { Image } from '../../gallery-api';

interface ImageCardProps {
  image: Image,
  onOpenModal: (data: Image) => void,
}

export default function ImageCard({ image, onOpenModal }: ImageCardProps) {
  return (
    <div onClick={() => onOpenModal(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className={css.imageCard}
      />
    </div>
  );
}
