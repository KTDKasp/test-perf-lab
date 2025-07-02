import type { FilterSortType } from "../types/filters";

export const sortList: FilterSortType[] = [
  { name: "по названию (A-Z)", sortProperty: "name" },
  { name: "по названию (Z-A)", sortProperty: "-name" },
  { name: "по возрастанию цены", sortProperty: "price" },
  { name: "по убыванию цены", sortProperty: "-price" },
];

export const PER_PAGE = 6;
