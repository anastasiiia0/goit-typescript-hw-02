import { useState, useEffect } from 'react';
import { fetchImagesWithTopic } from '../../gallery-api';
import toast from 'react-hot-toast';

import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import SearchBar from '../SearchBar/SearchBar';

import { Image } from '../../gallery-api';

const InitialImg = {
  id: '',
  urls: {
    small: '',
    regular: '',
  },
  alt_description: '',
  user: {
    profile_image: {
      small: '',
    },
    name: '',
    instagram_username: '',
  },
  likes: 0,
  created_at: '',
}

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<Image>(InitialImg);

  useEffect(() => {
    //in case of first mounting
    if (query === '') {
      return;
    }

    async function handleSearch(): Promise<void> {
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

  const handleSubmit = (topic: string): void => {
    // reset
    setImages([]);
    setPage(1);

    setQuery(topic);
  };

  const onClickLoadMoreBtn = (): void => {
    setPage(page + 1);
  };

  function closeModal(): void {
    setIsOpen(false);
    setModalData(InitialImg);
  }

  function openModal(data: Image): void {
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
