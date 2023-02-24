import { createSlice } from '@reduxjs/toolkit';
import { dataProducts } from '../reduxTypes/typesReduxProducts';

const initialProducts: dataProducts = {
  cartProducts: [],
  status: 'idle',
  error: null!,
};
const allProductsSlice = createSlice({
  name: 'allProducts',
  initialState: initialProducts,
  reducers: {
    getAllProductsSuccess: (state, action) => {
      state.cartProducts = action.payload;
    },
    getAllProductsError: (state, action) => {
      state.error = action.payload;
    },
    getAllProductsStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});
export const {
  getAllProductsSuccess,
  getAllProductsError,
  getAllProductsStatus,
} = allProductsSlice.actions;

export default allProductsSlice.reducer;
