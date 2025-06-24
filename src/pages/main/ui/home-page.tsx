import { ProductsList } from "@/shared/ui/components/products-list";
import { Suspense } from "react";


function HomePage() {
  return (
		<main>
			<h1>Home Page</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<ProductsList />
			</Suspense>
		</main>
	);
}

export const Component = HomePage;
