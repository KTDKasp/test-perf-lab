import { getAllProducts } from "@/shared/services/get-all-products"
import { use } from "react"
import { ProductCard } from "./product-card"

const defaultProductsData = getAllProducts();
export function ProductsList() {
	const products = use(defaultProductsData)

	if (!products) return (
		<div>
			Error fetching products. Please restart page
		</div>
	)

	return (
		<ul className="grid grid-cols-3 gap-2">
				{
					products.map(product => (
						<li className="max-h-[370px] max-w-[300px]" key={product.id}>
							<ProductCard product={product} />
						</li>
					))
				}
			</ul>
	)
}