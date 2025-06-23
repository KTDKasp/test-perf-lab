import { createBrowserRouter } from "react-router-dom";
import { Providers } from "./providers";
import { App } from "./app";
import { ROUTES } from "@/shared/api/routes";

export const router = createBrowserRouter([
	{
		element: (
			<Providers>
				<App />
			</Providers>
		),
		children: [
			{
				path: ROUTES.HOME,
				lazy: () => import("@/pages/main/ui/home-page")
			}
		]
	}
])