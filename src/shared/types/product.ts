export interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	category: 'food' | 'clothing' | 'electronics';
}
