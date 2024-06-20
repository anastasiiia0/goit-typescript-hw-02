import css from './ImageModal.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ImageModal({ onCloseModal, data, modalIsOpen }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      overlayClassName={css.overlay}
      className={css.modal}
    >
      <img
        className={css.modalImage}
        src={data.urls.regular}
        alt={data.alt_description}
      />

      <div className={css.imgInfo}>
        <p className={css.imgInfoText}>
          <span className={css.grayText}>Description:</span>{' '}
          {data.alt_description}
        </p>
        <p className={css.imgInfoText}>
          <span className={css.grayText}>Likes:</span> {data.likes}
        </p>
      </div>
    </Modal>
  );
}
