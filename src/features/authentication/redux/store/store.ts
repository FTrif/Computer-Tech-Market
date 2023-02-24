import createSagaMiddleware from 'redux-saga';
import cartSlice from '../../../Announcement/Redux/reducers/cartSlice';
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from '../reducers/authReducers';
import getCollection from '../../../Announcement/Redux/saga/allProductsSaga';
import allProductsSlice from '../../../Announcement/Redux/reducers/productsSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: AuthReducer,
    allProducts: allProductsSlice,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare({ thunk: false }).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(getCollection);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
