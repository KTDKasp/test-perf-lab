import { API } from "../lib/api";
import type { Product } from "../types/product";

export async function getAllProducts() {
	try {
		const res = await fetch(API.allProducts);
    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }
		return res.json() as Promise<Product[]>;
  } catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
  }
}
