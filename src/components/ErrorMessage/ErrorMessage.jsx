import css from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return <p className={css.error}>Ooops, something went wrong</p>;
}
