import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart } from '../reduxTypes/typesReduxCart';

const initialCart: Cart = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCart,
  reducers: {
    addProduct: (
      state: Cart,
      actions: PayloadAction<{
        id: string;
        productName: string;
        price: number;
        imageUrl: string;
        quantity: number;
        totalPrice: number;
      }>
    ) => {
      const newItem = actions.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          pret: newItem.price,
          image: newItem.imageUrl,
          title: newItem.productName,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.pret) * Number(item.quantity),
        0
      );
    },

    deleteProduct: (
      state: Cart,
      actions: PayloadAction<{
        id: string;
      }>
    ) => {
      const id = actions.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.pret) * Number(item.quantity),
        0
      );
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
