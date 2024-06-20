import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdSearch } from 'react-icons/io';

export default function SearchBar({ onSubmit }) {
  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;
    const searchValue = form.elements.searchTitle.value;

    if (searchValue.trim() === '') {
      toast.error('Please enter search term!');
      return;
    }

    onSubmit(searchValue);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          className={css.formInput}
          type="text"
          name="searchTitle"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.formSubmitBtn}>
          <IoMdSearch className={css.searchIcon} />
        </button>
        <Toaster />
      </form>
    </header>
  );
}
