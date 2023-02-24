import React from 'react';
import { useAppSelector } from '../../authentication/hooks/authHooks';
import LoadingSpinner from '../../authentication/screens/loadingSpinner/LoadingSpinner';

const StatusFetchData: React.FC<{}> = () => {
  const dataStatus = useAppSelector((state) => state.allProducts.status);
  const dataError = useAppSelector((state) => state.allProducts.error);
  return (
    <>
      {dataStatus === 'loading' ? (
        <LoadingSpinner />
      ) : dataStatus === 'failed' ? (
        <h1>{dataError.message}</h1>
      ) : (
        dataStatus === 'idle'
      )}
    </>
  );
};

export default StatusFetchData;
