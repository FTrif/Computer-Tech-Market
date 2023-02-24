import { useEffect, useState } from 'react';
import { db } from '../../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

const useGetData = () => {
  const [data, setData] = useState<any>([]);
  const collectionRef = collection(db, 'products');

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collectionRef);

      setData(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getData();
  }, []);
  return { data };
};
export default useGetData;
