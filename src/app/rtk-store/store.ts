import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { saveState } from './storage';
import { CART_PERSISTENT_STATE } from './cart.slice';
import cartSliceReducer from './cart.slice';
import filtersSliceReducer from './filters.slice';

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    filters: filtersSliceReducer
  },
})

store.subscribe(() => {
  saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();