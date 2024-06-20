import css from './Loader.module.css';
import { MutatingDots } from 'react-loader-spinner';

const Loader: React.FunctionComponent = () => {
  return (
    <MutatingDots
      height="80"
      width="80"
      color="#3747ac"
      secondaryColor="#3747ac"
      wrapperClass={css.loader}
    />
  );
}

export default Loader;