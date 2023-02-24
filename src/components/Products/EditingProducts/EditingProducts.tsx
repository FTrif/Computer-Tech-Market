import React from 'react';
import ImageGalleryCarousel from '../ImageGallery/ImageGalleryCarousel';
import style from './EditingProducts.module.scss';
import image from '../../../theme/image';
import RecentSearches from '../../ProductCarousel/RecentSearches';
import { Link, useLocation } from 'react-router-dom';

const EditingProducts: React.FC<{}> = () => {
  const location = useLocation();
  return (
    <>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <ImageGalleryCarousel />
        </div>
        <div className={style.detailsBox}>
          <div>
            <h2>{location.state.title} </h2>
            <Link to="/editAd">
              <button>
                <img src={image.editIcon} alt="editIcon" />
              </button>
            </Link>
          </div>
          <div className={style.itemPrice}>{location.state.pret} Lei</div>
          <div className={style.itemInfo}>
            <button>{location.state.categorie}</button>
            <button>Stare: {location.state.stare}</button>
          </div>
          <div className={style.itemDescription}>
            <h3>Descriere:</h3>
            <section>{location.state.descriereTotala}</section>
          </div>
        </div>
      </div>
      <RecentSearches />
    </>
  );
};

export default EditingProducts;
