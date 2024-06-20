import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { IoMdSearch } from 'react-icons/io';

interface SearchBarProps {
  onSubmit: (topic: string) => void,
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const form = evt.target as HTMLFormElement;
    const searchValue = form.elements.namedItem("searchTitle") as HTMLInputElement;
     const value = searchValue.value.trim();

    if (value === '') {
      toast.error('Please enter search term!');
      return;
    }

    onSubmit(value);
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
