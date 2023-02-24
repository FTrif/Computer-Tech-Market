import ProductCarousel from './ProductCarousel';
import classes from './styles/RecentSearches.module.scss';

const RecentSearcers: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Căutări recente</h1>
      </div>
      <div>
        <ProductCarousel />
      </div>
    </div>
  );
};

export default RecentSearcers;
