import type { Product } from "@/shared/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./thunks/products-thunk";

export type ProductsState = {
  products: Product[];
  totalPages: number;
  error: string | null | undefined;
  loading: boolean;
};

const initialState: ProductsState = {
  products: [],
  totalPages: 0,
  error: null,
  loading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.totalPages = 0;
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.totalPages = action.payload.pages;
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default productsSlice.reducer;
