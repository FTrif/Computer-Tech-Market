import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FootBar from '../components/FootBar/FootBar';
import HomePage from '../features/homepage/HomePage';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import RegisterPage from '../components/RegisterPage/RegisterPage';
import AddAnnouncement from '../components/Announcement/AddAnnouncement';
import EditingProducts from '../components/Products/EditingProducts/EditingProducts';
import ViewProducts from '../components/Products/viewProducts/ViewProducts';
import OrderProducts from '../components/OrderProducts/OrderProducts';
import EditAd from '../components/EditAd/EditAd';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import {
  useAppSelector,
  LoggedIn,
} from '../features/authentication/hooks/authHooks';
import CategoriesList from '../components/CategoriesList/CategoriesList';

const MainNavigator = () => {
  const loggedIn = useAppSelector(LoggedIn);
  return (
    <>
      {/* this should be Navbar to be edit */}
      <Navbar />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/profile" element={loggedIn && <ProfilePage />} />
        <Route path="/editingP" element={<EditingProducts />} />
        <Route path="/list" element={<CategoriesList />} />
        <Route path="/viewP" element={<ViewProducts />} />
        <Route path="/anunt" element={<AddAnnouncement />} />
        <Route path="/login" element={!loggedIn && <Login />} />
        <Route path="/editAd" element={<EditAd />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="anunt" element={<AddAnnouncement />}>
            <Route path="home" element={<HomePage />} />
          </Route>
          <Route path="viewP" element={<ViewProducts />} />
          <Route path="editingP" element={<EditingProducts />}>
            <Route path="editAd" element={<EditAd />}>
              <Route path="home" element={<HomePage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/register" element={!loggedIn && <RegisterPage />}>
          <Route path="login" element={!loggedIn && <Login />} />
        </Route>
        <Route path="/order" element={<OrderProducts />} />
      </Routes>
      {/* this should be Footer to be edit */}
      <FootBar />
    </>
  );
};

export default MainNavigator;
