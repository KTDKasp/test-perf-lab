import { API } from "../lib/api";
import type { ElectronicsProduct } from "../types/product";

export async function getElectronicsData() {
	try {
		const res = await fetch(API.electronics);
		if (!res.ok) {
			throw new Error(`Failed to fetch electronics, status: ${res.status}`);
		}
		return res.json() as Promise<ElectronicsProduct[]>;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		}
	}
}
