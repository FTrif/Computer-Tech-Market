import React from 'react';

import ProductCarousel from './ProductCarousel';
import classes from './styles/RecentSearches.module.scss';

const Sugestions: React.FC<{}> = () => {
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h1>Sugestii</h1>
      </div>
      <ProductCarousel />
    </div>
  );
};

export default Sugestions;
