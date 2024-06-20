import { useState, useEffect } from 'react';
import { fetchImagesWithTopic } from '../../gallery-api';
import toast from 'react-hot-toast';

import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    //in case of first mounting
    if (query === '') {
      return;
    }

    async function handleSearch() {
      try {
        setError(false);
        setLoading(true);

        const data = await fetchImagesWithTopic(query, page);

        if (data.imagesCollection.length === 0) {
          toast.error('No photo with such query :(');
          return;
        }

        setTotalPages(data.totalPages);

        setImages(prevImages => {
          return [...prevImages, ...data.imagesCollection];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    handleSearch();
  }, [page, query]);

  const handleSubmit = topic => {
    // reset
    setImages([]);
    setPage(1);

    setQuery(topic);
  };

  const onClickLoadMoreBtn = () => {
    setPage(page + 1);
  };

  // function handleModalToggle(data) {
  //   modalIsOpen
  //     ? (setModalData({}), setIsOpen(false))
  //     : (setModalData(data), setIsOpen(true));
  // }

  function closeModal() {
    setIsOpen(false);
    setModalData({});
  }

  function openModal(data) {
    setIsOpen(true);
    setModalData(data);
  }

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery images={images} onOpenModal={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={onClickLoadMoreBtn} />
      )}

      {modalIsOpen && (
        <ImageModal
          onCloseModal={closeModal}
          data={modalData}
          modalIsOpen={modalIsOpen}
        />
      )}
    </>
  );
}
