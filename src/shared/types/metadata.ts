import type { Product } from "./product";

export interface fetchMetadata {
  first: number;
  prev: null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Product[];
}
