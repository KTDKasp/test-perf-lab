import { createBrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import { App } from "./app";
import { ROUTES } from "@/shared/api/routes";

export const router = createBrowserRouter([
	{
		path: ROUTES.HOME,
		element: (
			<Providers>
				<App />
			</Providers>
		),
		children: [
			{
				index: true,
				lazy: () => import("@/pages/main/ui/home-page")
			},
			{
				path: ROUTES.FOOD,
				lazy: () => import("@/pages/products/ui/food-page")
			},
			{
				path: ROUTES.CLOTHING,
				lazy: () => import("@/pages/products/ui/clothing-page")
			},
			{
				path: ROUTES.ELECTRONICS,
				lazy: () => import("@/pages/products/ui/electronics-page")
			},
			{
				path: ROUTES.SUCCESS_ORDER,
				lazy: () => import("@/pages/success-order/ui/success-order-page")
			},
			{
				path: ROUTES.NOT_FOUND,
				lazy: () => import("@/pages/not-found/ui/not-found-page")
			}
		]
	}
])