import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const AuthToken = (state: RootState) => state.auth.tokenId;
export const LoggedIn = (state: RootState) => state.auth.isLoggedIn;
