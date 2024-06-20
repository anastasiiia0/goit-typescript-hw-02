import css from './ImageCard.module.css';

export default function ImageCard({ image, onOpenModal }) {
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
