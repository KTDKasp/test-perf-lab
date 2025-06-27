import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Category = "all" | "food" | "clothing" | "electronics";

export type SortType = {
  name: string;
  sortProperty: "price" | "name" | "-price" | "-name";
};

export interface FilterSliceState {
  category: Category;
  currentPage: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  category: "all",
  currentPage: 1,
  sort: {
    name: "по названию (A-Z)",
    sortProperty: "name",
  },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.category = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sort.name = action.payload.name;
      state.sort.sortProperty = action.payload.sortProperty;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort = action.payload.sort;
      state.category = action.payload.category;
      state.currentPage = Number(action.payload.currentPage);
    },
  },
});

export const { setCategory, setSortType, setCurrentPage, setFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
