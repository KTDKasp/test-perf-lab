import type { Filters } from "@/shared/types/filters";
import type { fetchMetadata } from "@/shared/types/metadata";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { PER_PAGE } from "@/shared/utils/constants";
import { API } from "@/shared/lib/api";

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
