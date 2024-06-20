import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

export default function ImageGallery({ images, onOpenModal }) {
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
