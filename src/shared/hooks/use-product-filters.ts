import { useSearchParams } from "react-router-dom";
import type { Filters } from "../types/filters";
import { useCallback } from "react";

export function useProductFilters() {
	const [searchParams, setSearchParams] = useSearchParams();

	const page = Number(searchParams.get("currentPage")) as Filters["currentPage"] || 1;
	const category = searchParams.get("category") as Filters["category"] || "all";
	const sortProperty = searchParams.get("sortProperty") as Filters["sort"] || "name";

	const setFilters = useCallback((filters: Filters) => {
		setSearchParams((params) => {
			if (filters.currentPage) {
				params.set("currentPage", filters.currentPage.toString());
			}
			
			if (filters.category) {
				params.set("category", filters.category);
				params.set("currentPage", String(1));
			}

			if (filters.sort) {
				params.set("sortProperty", filters.sort);
			}

			return params;
		})
	}, []);

	return {
		page,
		category,
		sortProperty,
		setFilters
	}
}