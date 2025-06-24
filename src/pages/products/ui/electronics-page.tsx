import { getElectronicsData } from "@/shared/services/get-electronics-data";
import { ProductCard } from "@/shared/ui/components/product-card";
import { Suspense, use } from "react";

const defaultElectronicsData = getElectronicsData();
function ElectronicsPage() {
	const electronicsProducts = use(defaultElectronicsData);

	if (!electronicsProducts) return (
		<div>
			Error fetching electronics. Please restart page
		</div>
	)
	return (
			<>
				<h2>Electronics</h2>
				<Suspense fallback={<div>Loading...</div>}>
					<ul className="grid grid-cols-3 gap-2">
						{electronicsProducts.map(product => (
							<li key={product.id}>
								<ProductCard product={product} />
							</li>
						))}
					</ul>
				</Suspense>
			</>
		);
}

export const Component = ElectronicsPage