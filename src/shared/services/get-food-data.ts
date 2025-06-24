import { API } from "../lib/api";
import type { FoodProduct } from "../types/product";

export async function getFoodData() {
	try {
		const res = await fetch(API.food);
		if (!res.ok) {
			throw new Error(`Failed to fetch food, status: ${res.status}`);
		}
		return res.json() as Promise<FoodProduct[]>;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
}
