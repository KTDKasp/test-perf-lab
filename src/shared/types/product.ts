export interface ProductBase {
	id: string;
	name: string;
	price: number;
	image: string;
}

export interface FoodProduct extends ProductBase {
	category: 'food';
	calories: number;
	weight: number;
}

export interface ClothingProduct extends ProductBase {
	category: 'clothing';
	size: string;
	material: string;
}

export interface ElectronicsProduct extends ProductBase {
	category: 'electronics';
	warrantyYears: number;
  brand: string;
}

export type Product = FoodProduct | ClothingProduct | ElectronicsProduct;

