import { useAppDispatch, useAppSelector } from "@/app/rtk-store/store";
import { fetchProducts } from "@/app/rtk-store/thunks/products-thunk";
import { ROUTES, type PathParams } from "@/shared/api/routes";
import { useProductFilters } from "@/shared/hooks/use-product-filters";
import { cn } from "@/shared/lib/css";
import { validateProductType } from "@/shared/services/validate-product-type";
import type { FilterCategory } from "@/shared/types/filters";
import { Pagination } from "@/shared/ui/components/pagination";
import { ProductCard } from "@/shared/ui/components/product-card";
import { SelectSort } from "@/shared/ui/components/select-sort";
import { productTypeName } from "@/shared/utils/constants";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

function ProductsPage() {
  const { productType } = useParams<PathParams[typeof ROUTES.PRODUCTS]>();
  const validProductType = validateProductType(productType);

  const { products, error, loading, totalPages } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const pageCategory = validProductType as FilterCategory;

  const { page: currentPage, setFilters, sortProperty } = useProductFilters();

  useEffect(() => {
    dispatch(
      fetchProducts({
        category: pageCategory,
        currentPage,
        sort: sortProperty,
      }),
    );
  }, [pageCategory, currentPage, sortProperty]);

  const productPageName = productTypeName[validProductType!];

  const handleClickPage = (page: number) => {
    setFilters({ currentPage: page });
  };

  if (!validProductType) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <main className="w-full flex flex-col flex-1">
      <div className="container flex flex-col items-center mx-auto flex-[1]">
        <h2 className="text-3xl font-semibold mb-2">{productPageName}</h2>
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

export const Component = ProductsPage;
