import { API } from "@/shared/lib/api";
import type { Filters } from "@/shared/types/filters";
import type { fetchMetadata } from "@/shared/types/metadata";
import type { Product } from "@/shared/types/product";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { PER_PAGE } from "@/shared/utils/constants";

export type ProductsState = {
  products: Product[];
  totalPages: number;
  error: string | null | undefined;
	loading: boolean;
};

export const fetchProducts = createAsyncThunk<
  fetchMetadata,
  Filters,
  { state: RootState }
>(
  "products/fetchProducts",
  async ({ category, currentPage, sort }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        API.allProducts +
          `?_sort=${sort}&${category === "all" ? "" : `category=${category}&`}_page=${currentPage}&_per_page=${PER_PAGE}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products, status: ${response.status}`);
      }

      const data = (await response.json()) as fetchMetadata;
      return data;
    } catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
      return rejectWithValue(e);
    }
  },
);

const initialState: ProductsState = {
  products: [],
  totalPages: 0,
  error: null,
	loading: false
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.totalPages = 0;
			state.loading = true
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.totalPages = action.payload.pages;
			state.loading = false
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.error.message;
			state.loading = false
    });
  },
});

export default productsSlice.reducer;
