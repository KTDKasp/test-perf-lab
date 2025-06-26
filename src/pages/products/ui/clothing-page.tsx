import { setSortType } from "@/app/rtk-store/filters.slice";
import { useAppDispatch, type RootState } from "@/app/rtk-store/store";
import { API } from "@/shared/lib/api";
import type { fetchMetadata } from "@/shared/types/metadata";
import type { Product } from "@/shared/types/product";
import { Pagination } from "@/shared/ui/components/pagination";
import { ProductCard } from "@/shared/ui/components/product-card";
import { SelectSort } from "@/shared/ui/components/select-sort";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const PER_PAGE = 6;

function ClothingPage() {
	const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sort = useSelector((state: RootState) => state.filters.sort);
  const dispatch = useAppDispatch();

  const totalPagesRef = useRef<number | null>(null);

  useEffect(() => {
    let ignore = false;

    const getAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          API.allProducts +
            `?_sort=${sort.sortProperty}&category=clothing&_page=${page}&_per_page=${PER_PAGE}`,
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch products, status: ${res.status}`);
        }
        const fetchData = (await res.json()) as fetchMetadata;
        if (ignore) {
          return;
        }
        totalPagesRef.current = fetchData.pages;
        setProducts(fetchData.data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setIsLoading(false);
          setError(error.message);
        }
      }
    };

    getAllProducts();

    return () => {
      ignore = true;
    };
  }, [page, sort.sortProperty]);

  if (isLoading) {
    return <p className="font-bold">Loading...</p>;
  }
  return (
    <main>
					<div className="flex items-center gap-5 mt-2 mb-5">
						<h2>Electronics Page</h2>
						
						<SelectSort
							sortValue={sort}
							onChangeSort={(sortType) => dispatch(setSortType(sortType))}
						/>
					</div>
					<ul className="grid grid-cols-3 justify-items-center gap-2 mb-5">
						{products.map((product) => (
							<li className="max-h-[370px] max-w-[300px] w-full" key={product.id}>
								<ProductCard product={product} />
							</li>
						))}
					</ul>
					{error && <p className="font-bold">{error}</p>}
					<Pagination
						totalPages={totalPagesRef.current || 1}
						currentPage={page}
						onChangePage={setPage}
					/>
				</main>
  );
}

export const Component = ClothingPage;
