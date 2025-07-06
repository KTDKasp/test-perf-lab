export type FilterCategory = "all" | "food" | "clothing" | "electronics";

export type FilterSortType = {
  name: string;
  sortProperty: "price" | "name" | "-price" | "-name";
};

export interface Filters {
  category?: FilterCategory;
  currentPage?: number;
  sort?: FilterSortType["sortProperty"];
}
