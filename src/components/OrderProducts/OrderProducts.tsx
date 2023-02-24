import { Link } from 'react-router-dom';
import image from '../../theme/image';
import React, { useState } from 'react';
import styles from './OrderProducts.module.scss';
import RecentSearcers from '../ProductCarousel/RecentSearches';
import StepProgressBar from './stepBar/ReactStepProgressBar';
import OrderDetails from './orderDetails/OrderDetails';
import { useAppSelector } from '../../features/authentication/hooks/authHooks';
import { motion } from 'framer-motion';
import List from './List';

const OrderProducts: React.FC<{}> = () => {
  const [cart, showCart] = useState(true);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);

  return (
    <>
      <div className={styles.forwardTitle}>
        <Link to={'/home'}>
          <button>
            <img src={image.leftBlackArrow} alt="arrow-icon" />
          </button>
        </Link>
        <h1>COȘUL MEU</h1>
      </div>
      {cart === true ? (
        <>
          <StepProgressBar steper={0} />

          <div className={styles.orderBody}>
            {cartItems.length === 0 ? (
              <h1>Nici un produs adaugat in cos!</h1>
            ) : (
              <div className={styles.orderCart}>
                <div className={styles.orderTitle}>
                  <h3>Nume produs</h3>
                  <h3>Cantitate</h3>
                  <h3>Preț</h3>
                </div>
                <div className={styles.orderList}>
                  {cartItems.map((item, index) => {
                    return <List item={item} key={index} />;
                  })}
                </div>
                <div className={styles.orderTotal}>
                  <h3>TOTAL:</h3>
                  <h3>{totalAmount} Lei</h3>
                </div>
                <div className={styles.continueButton}>
                  <motion.button
                    whileTap={{ scale: 1.2 }}
                    onClick={() => showCart(false)}
                  >
                    Continuă
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <OrderDetails />
      )}
      <RecentSearcers />
    </>
  );
};

export default OrderProducts;
