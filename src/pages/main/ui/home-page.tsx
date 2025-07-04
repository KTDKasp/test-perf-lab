import { Filters } from "@/shared/ui/components/filters-group";
import { Pagination } from "@/shared/ui/components/pagination";
import { ProductCard } from "@/shared/ui/components/product-card";
import { SelectSort } from "@/shared/ui/components/select-sort";
import { useEffect } from "react";
import { useProductFilters } from "@/shared/hooks/use-product-filters";
import { useAppDispatch, useAppSelector } from "@/app/rtk-store/store";
import { cn } from "@/shared/lib/css";
import { fetchProducts } from "@/app/rtk-store/thunks/products-thunk";

function HomePage() {
  const { products, error, loading, totalPages } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();

  const {
    category,
    page: currentPage,
    setFilters,
    sortProperty,
  } = useProductFilters();

  useEffect(() => {
    dispatch(fetchProducts({ category, currentPage, sort: sortProperty }));
  }, [category, currentPage, sortProperty]);

  const handleClickPage = (page: number) => {
    setFilters({ currentPage: page });
  };

  return (
    <main className="w-full flex flex-col flex-1">
      <div className="container flex flex-col items-center mx-auto flex-[1]">
        <h2 className="text-3xl font-semibold mb-2">Все продукты</h2>
        <div className="flex items-center gap-5 mb-5">
          <Filters
            category={category}
            onClickCategory={(categoryName) =>
              setFilters({ category: categoryName })
            }
          />
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

export const Component = HomePage;
