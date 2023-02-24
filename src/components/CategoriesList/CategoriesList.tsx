import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './CategoriesList.module.scss';
import Card from '../Card/Card';
import RecentSearcers from '../ProductCarousel/RecentSearches';
import ReactPaginate from 'react-paginate';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../features/authentication/hooks/authHooks';
import StatusFetchData from '../../features/Announcement/status/StatusFetchData';

const CategoriesList: React.FC<{}> = () => {
  const dataProducts = useAppSelector(
    (state) => state.allProducts.cartProducts
  );
  const dataStatus = useAppSelector((state) => state.allProducts.status);
  const [pageNumber, setPageNumber] = useState(0);
  const location = useLocation();
  const usersPerPage = 12;
  const slice = dataProducts.slice(0, 70);
  const pageCount = Math.ceil(slice.length / usersPerPage);
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = dataProducts
    .filter(
      (item: { categorie: string }) => item.categorie === location.state.value
    )
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item) => {
      return (
        <Card
          isYourProduct={false}
          image={item.image[0]}
          title={item.title[0].toLocaleUpperCase() + item.title.slice(1, 15)}
          pret={item.pret}
          descriere={item.descriere}
          buttonAdd={'Adaugă în coș'}
          buttonView={''}
          categorie={item.categorie}
          descriereTotala={item.descriereTotala}
          stare={item.stare}
          id={item.id}
        />
      );
    });

  const handlePageClick = (users: {
    selected: React.SetStateAction<number>;
  }) => {
    setPageNumber(users.selected);
  };
  return (
    <div className={styles.containerCategoriesList}>
      <div className={styles.categoryTitle}>
        <h1>{location.state.value}</h1>
      </div>
      <div className={styles.categoryBar}>
        <h3>Ordonează după:</h3>
        <select className={styles.selectContainer}>
          <option value="Cele mai noi">Cele mai noi</option>
          <option value="Relevanță"> Relevanță</option>
          <option value="Cele mai vechi">Cele mai vechi</option>
          <option value="Preț crescător"> Preț crescător</option>
          <option value="Preț descrescător"> Preț descrescător</option>
        </select>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.categoryBody}
      >
        {dataStatus === 'succeeded' ? displayUsers : <StatusFetchData />}
        {dataStatus === 'succeeded' && displayUsers.length === 0 ? (
          <h1>Nu a fost gasit nici un produs!</h1>
        ) : (
          ''
        )}
      </motion.div>
      {displayUsers.length === 0 ? (
        ''
      ) : (
        <div className={styles.containerPagination}>
          <h3>Pagina:</h3>

          <ReactPaginate
            pageCount={pageCount}
            pageRangeDisplayed={5}
            marginPagesDisplayed={0}
            previousLabel={'<'}
            nextLabel={'>'}
            containerClassName={styles.paginationBody}
            pageClassName={styles.pageItem}
            previousClassName={styles.previousArrow}
            nextClassName={styles.nextArrow}
            breakClassName={styles.breakDots}
            activeClassName={styles.activePage}
            onPageChange={handlePageClick}
          />
        </div>
      )}
      <RecentSearcers />
    </div>
  );
};

export default CategoriesList;
