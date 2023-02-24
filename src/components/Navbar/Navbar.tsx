import React, { useState } from 'react';
import LoginModal from '../LoginModal/LoginModal';
import classes from './Navbar.module.scss';
import image from '../../theme/image';
import SearchBar from './components/SearchBar/SearchBar';
import Categories from './components/categories/Categories';
import { Link } from 'react-router-dom';
import {
  useAppSelector,
  LoggedIn,
} from '../../features/authentication/hooks/authHooks';
import ProfileModal from '../ProfileModal/ProfileModal';
import { motion } from 'framer-motion';

const Navbar: React.FC<{}> = () => {
  const [openModal, setOpenModal] = useState(false);
  const loggedIn = useAppSelector(LoggedIn);
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  const showModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHangler = () => {
    setOpenModal(false);
  };

  return (
    <>
      <nav className={classes.container}>
        <div className={classes.items}>
          <div className={classes.logo}>
            <Link to={'home'}>
              <motion.img
                whileTap={{ scale: 0.9 }}
                src={image.logo}
                alt="logo"
              />
            </Link>
          </div>
          <Categories />
          <SearchBar />
          <div>
            <Link to={'order'}>
              <motion.button whileTap={{ scale: 0.5 }}>
                <span>{totalQuantity}</span>
                <img src={image.cart} alt="cart" />
              </motion.button>
            </Link>
          </div>
          <div>
            {!loggedIn && (
              <motion.button
                whileTap={{ scale: 0.5 }}
                onClick={showModalHandler}
              >
                <img src={image.profile} alt="profile" />
              </motion.button>
            )}
            {loggedIn && !openModal && (
              <motion.button
                whileTap={{ scale: 0.5 }}
                onClick={showModalHandler}
              >
                <img src={image.profile} alt="profile" />
              </motion.button>
            )}
            {loggedIn && openModal && (
              <motion.button
                whileTap={{ scale: 0.5 }}
                onClick={closeModalHangler}
              >
                <img src={image.profile} alt="profile" />
              </motion.button>
            )}
          </div>
          <div>
            <motion.button whileTap={{ scale: 0.5 }}>
              <Link to={'anunt'}>
                <img src={image.plus} alt="plus" />
              </Link>
            </motion.button>
          </div>
        </div>
      </nav>
      {loggedIn && openModal && <ProfileModal />}
      {!loggedIn && openModal && <LoginModal onClose={closeModalHangler} />}
    </>
  );
};

export default Navbar;
