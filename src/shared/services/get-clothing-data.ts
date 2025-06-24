import { API } from "../lib/api";
import type { ClothingProduct } from "../types/product";

export async function getClothingData() {
	try {
		const res = await fetch(API.clothing);
		if (!res.ok) {
			throw new Error(`Failed to fetch clothing, status: ${res.status}`);
		}
		return res.json() as Promise<ClothingProduct[]>;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
}
