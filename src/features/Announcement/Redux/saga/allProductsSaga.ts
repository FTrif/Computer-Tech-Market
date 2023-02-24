import { collection, getDocs } from 'firebase/firestore';
import { put } from 'redux-saga/effects';
import { db } from '../../../../utils/firebase';
import { dataProduct } from '../reduxTypes/typesReduxProducts';
import {
  getAllProductsSuccess,
  getAllProductsError,
  getAllProductsStatus,
} from '../reducers/productsSlice';

function* getCollection(): Generator<{}> {
  try {
    yield put(getAllProductsStatus('loading'));
    const querySnapshot: any = yield getDocs(collection(db, 'products'));
    const products: dataProduct[] = [];
    querySnapshot.docs.map((doc: { data: () => dataProduct; id: string }) =>
      products.push({
        ...doc.data(),
        id: doc.id,
      })
    );
    yield put(getAllProductsSuccess(products));
    yield put(getAllProductsStatus('succeeded'));
  } catch (error) {
    yield put(getAllProductsError(error));
    yield put(getAllProductsStatus('failed'));
  }
}

export default getCollection;
