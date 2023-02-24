import React from 'react';
import ImageGalleryCarousel from '../ImageGallery/ImageGalleryCarousel';
import RecentSearcers from '../../ProductCarousel/RecentSearches';
import style from './ViewProducts.module.scss';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../../features/Announcement/Redux/reducers/cartSlice';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const ViewProducts: React.FC<{}> = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  let addToCart = () => {
    dispatch(
      cartActions.addProduct({
        id: location.state.id,
        productName: location.state.title,
        price: location.state.pret,
        imageUrl: location.state.image,
        quantity: 1,
        totalPrice: 0,
      })
    );
    toast.success('Produs adaugat cu succes!');
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <ImageGalleryCarousel />
        </div>
        <div className={style.detailsBox}>
          <div>
            <h2>{location.state.title} </h2>
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
          <div className={style.addContainer}>
            <motion.button
              whileTap={{ scale: 1.2 }}
              onClick={addToCart}
              className={style.addProducts}
            >
              <label>Adaugă în coș</label>
            </motion.button>
          </div>
        </div>
      </div>
      <RecentSearcers />
    </>
  );
};

export default ViewProducts;
