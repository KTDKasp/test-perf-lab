import type { SortType } from "@/app/rtk-store/filters.slice";

export const sortList: SortType[] = [
  { name: "по названию (A-Z)", sortProperty: "name" },
  { name: "по названию (Z-A)", sortProperty: "-name" },
  { name: "по возрастанию цены", sortProperty: "price" },
  { name: "по убыванию цены", sortProperty: "-price" },
];
