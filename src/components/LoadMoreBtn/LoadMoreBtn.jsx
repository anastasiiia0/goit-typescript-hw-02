import css from './LoadMoreBtn.module.css';

export default function LoadMoreBtn({ onClick }) {
  return (
    <button type="button" className={css.loadMoreBtn} onClick={onClick}>
      Load More
    </button>
  );
}
