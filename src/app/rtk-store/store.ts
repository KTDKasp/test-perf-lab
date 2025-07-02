import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { saveState } from "./storage";
import { CART_PERSISTENT_STATE } from "./cart.slice";
import cartSliceReducer from "./cart.slice";
import productsSliceReducer from "./products.slice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    products: productsSliceReducer
  },
});

store.subscribe(() => {
  saveState(store.getState().cart, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
