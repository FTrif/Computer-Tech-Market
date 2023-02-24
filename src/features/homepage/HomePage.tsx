import React from 'react';
import { useAppSelector, LoggedIn } from '../authentication/hooks/authHooks';
import Anunt from '../../components/Ad/Anunt';
import YourProducts from '../../components/ProductCarousel/YourProducts';
import RecentSearches from '../../components/ProductCarousel/RecentSearches';
import Sugestions from '../../components/ProductCarousel/Sugestions';

const HomePage: React.FC<{}> = () => {
  const loggedIn = useAppSelector(LoggedIn);
  return (
    <div>
      <Anunt />
      <Sugestions />
      {loggedIn && <YourProducts />}
      <RecentSearches />
    </div>
  );
};

export default HomePage;
