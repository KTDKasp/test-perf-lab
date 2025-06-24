import { getFoodData } from "@/shared/services/get-food-data";
import { ProductCard } from "@/shared/ui/components/product-card";
import { Suspense, use } from "react";

const defaultFoodData = getFoodData();
function FoodPage() {
	const foodProducts = use(defaultFoodData);

	if (!foodProducts) return (
		<div>
			Error fetching food. Please restart page
		</div>
	)
  return (
    <>
      <h2>Food</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="grid grid-cols-3 gap-2">
					{foodProducts.map(product => (
						<li key={product.id}>
							<ProductCard product={product} />
						</li>
					))}
				</ul>
      </Suspense>
    </>
  );
}

export const Component = FoodPage;
