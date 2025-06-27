import { API } from "../lib/api";
import type { fetchMetadata } from "../types/metadata";

export async function getAllProducts() {
  try {
    const res = await fetch(API.allProducts);
    if (!res.ok) {
      throw new Error(`Failed to fetch products, status: ${res.status}`);
    }
    const data = (await res.json()) as Promise<fetchMetadata>;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
