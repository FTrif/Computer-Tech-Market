import React from 'react';
import StatusFetchData from '../../features/Announcement/status/StatusFetchData';
import { useAppSelector } from '../../features/authentication/hooks/authHooks';
import useAuth from '../../features/authentication/hooks/useAuth';
import Card from '../Card/Card';
import classes from './styles/YourProducts.module.scss';

const YourProducts: React.FC<{}> = () => {
  const { currentUser } = useAuth();
  const dataProducts = useAppSelector(
    (state) => state.allProducts.cartProducts
  );
  const dataStatus = useAppSelector((state) => state.allProducts.status);
  const displayUsers = dataProducts
    .filter(
      (item: { yourProduct: string }) => item.yourProduct === currentUser.email
    )
    .map((item) => {
      return (
        <Card
          isYourProduct={true}
          image={item.image[0]}
          title={item.title[0].toLocaleUpperCase() + item.title.slice(1, 15)}
          pret={item.pret}
          descriere={item.descriere}
          buttonAdd={''}
          buttonView={'Vezi anunțul'}
          categorie={item.categorie}
          descriereTotala={item.descriereTotala}
          stare={item.stare}
          id={item.id}
        />
      );
    });

  return (
    <div>
      <div className={classes.title}>
        <h1>Produsele Tale</h1>
      </div>

      <div className={classes.prodContainter}>
        {dataStatus === 'succeeded' ? displayUsers : <StatusFetchData />}
      </div>
    </div>
  );
};

export default YourProducts;
