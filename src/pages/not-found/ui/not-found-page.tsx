import { ROUTES } from "@/shared/api/routes";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div>
			<h1>This page does not exist. Please return to home page</h1>
			<Link to={ROUTES.HOME}>Home page</Link>
		</div>
	)
}

export const Component = NotFound;