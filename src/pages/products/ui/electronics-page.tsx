import { fetchProducts } from "@/app/rtk-store/products.slice";
import { useAppDispatch, type RootState } from "@/app/rtk-store/store";
import { useProductFilters } from "@/shared/hooks/use-product-filters";
import { cn } from "@/shared/lib/css";
import type { FilterCategory } from "@/shared/types/filters";
import { Pagination } from "@/shared/ui/components/pagination";
import { ProductCard } from "@/shared/ui/components/product-card";
import { SelectSort } from "@/shared/ui/components/select-sort";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ElectronicsPage() {
  const { products, error, loading, totalPages } = useSelector(
    (state: RootState) => state.products,
  );
  const dispatch = useAppDispatch();

  const location = useLocation();
  const pageCategory = location.pathname.slice(1) as FilterCategory;

  const { page: currentPage, setFilters, sortProperty } = useProductFilters();

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: pageCategory,
        currentPage,
        sort: sortProperty,
      }),
    );
  }, [currentPage, sortProperty]);

  const handleClickPage = useCallback((page: number) => {
    setFilters({ currentPage: page });
  }, []);

  return (
    <main className="w-full flex flex-col flex-1">
      <div className="container flex flex-col items-center mx-auto flex-[1]">
        <h2 className="text-3xl font-semibold mb-2">Электроника</h2>
        <div className="flex items-center gap-5 mb-5">
          <SelectSort
            sortValue={sortProperty}
            onChangeSort={(sortType) =>
              setFilters({ sort: sortType.sortProperty })
            }
          />
        </div>
        <div className="flex-[1] w-full p-[10px]">
          <ul
            className={cn(
              "grid grid-cols-3 justify-items-center h-full gap-4 mb-5",
              {
                ["opacity-50"]: loading,
              },
            )}
          >
            {products.map((product) => (
              <li
                className="max-h-[370px] max-w-[300px] w-full"
                key={product.id}
              >
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        </div>
        {error && <p className="font-bold">{error}</p>}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handleClickPage}
        />
      </div>
    </main>
  );
}

export const Component = ElectronicsPage;
