import type { Product } from "@/shared/types/product";
import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { loadState } from "./storage";
import { calcTotalPrice } from "@/shared/utils/calc-total-price";

export const CART_PERSISTENT_STATE = "cartData";

export type CartProduct = Product & { quantity: number };

export type CartState = {
  cartItems: CartProduct[];
  totalPrice: number;
  isDrawerOpen: boolean;
};

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  cartItems: [],
  totalPrice: 0,
  isDrawerOpen: false,
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const isItemAdded = state.cartItems.find(
        (item) => item.id === action.payload.id,
      );
      if (!isItemAdded) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    subtractFromCart: (state, action: PayloadAction<string>) => {
      const isItemExist = state.cartItems.find(
        (item) => item.id === action.payload,
      );
      if (isItemExist) {
        isItemExist.quantity -= 1;
      }
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    deleteItemFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
      state.totalPrice = calcTotalPrice(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    toggleDrawer: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  clearCart,
  deleteItemFromCart,
  subtractFromCart,
  toggleDrawer,
} = cartSlice.actions;

export default cartSlice.reducer;
