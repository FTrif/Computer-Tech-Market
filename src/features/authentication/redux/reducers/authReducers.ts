import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth, authToken } from '../reduxTypes/reduxTypes';

const initialState = {
  tokenId: localStorage.getItem('token'),
  isLoggedIn: !!localStorage.getItem('token'),
} as Auth;

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login(state: Auth, action: PayloadAction<authToken>) {
      state.tokenId = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem('token', action.payload!);
    },
    logout(state: Auth) {
      state.tokenId = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export default authSlice.reducer;
