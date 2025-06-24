import { getClothingData } from "@/shared/services/get-clothing-data";
import { ProductCard } from "@/shared/ui/components/product-card";
import { Suspense, use } from "react";

const defaultClothingData = getClothingData();

function ClothingPage() {
	const clothingProducts = use(defaultClothingData);
	
	if (!clothingProducts) return (
		<div>
			Error fetching clothing. Please restart page
		</div>
	)
	return (
				<>
					<h2>Clothing</h2>
					<Suspense fallback={<div>Loading...</div>}>
						<ul className="grid grid-cols-3 gap-2">
							{clothingProducts.map(product => (
								<li key={product.id}>
									<ProductCard product={product} />
								</li>
							))}
						</ul>
					</Suspense>
				</>
			);
}

export const Component = ClothingPage