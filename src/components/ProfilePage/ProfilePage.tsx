import React from 'react';
import HomePage from '../../features/homepage/HomePage';
import useAuth from '../../features/authentication/hooks/useAuth';

const ProfilePage: React.FC<{}> = () => {
  const { currentUser } = useAuth();
  return (
    <>
      <h1>Bina ai venit , {currentUser.displayName} </h1>
      <HomePage />;
    </>
  );
};

export default ProfilePage;
