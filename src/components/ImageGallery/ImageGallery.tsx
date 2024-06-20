import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { Image } from '../../gallery-api';

interface ImageGalleryProps {
  images: Image[],
  onOpenModal: (data: Image) => void
}

export default function ImageGallery({ images, onOpenModal }: ImageGalleryProps) {
  return (
    <ul className={css.imageGalleryList}>
      {images.map(image => (
        <li key={image.id} className={css.imageGalleryListItem}>
          <ImageCard image={image} onOpenModal={onOpenModal}></ImageCard>
        </li>
      ))}
    </ul>
  );
}
