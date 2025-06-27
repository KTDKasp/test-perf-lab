import {
  setCategory,
  setCurrentPage,
  setFilters,
  setSortType,
} from "@/app/rtk-store/filters.slice";
import { useAppDispatch, type RootState } from "@/app/rtk-store/store";
import { API } from "@/shared/lib/api";
import type { fetchMetadata } from "@/shared/types/metadata";
import type { Product } from "@/shared/types/product";
import { Filters } from "@/shared/ui/components/filters-group";
import { Pagination } from "@/shared/ui/components/pagination";
import { ProductCard } from "@/shared/ui/components/product-card";
import { SelectSort } from "@/shared/ui/components/select-sort";
import { sortList } from "@/shared/utils/constants";
import QueryString from "qs";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PER_PAGE = 6;

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const currentPage = useSelector(
    (state: RootState) => state.filters.currentPage,
  );
  const category = useSelector((state: RootState) => state.filters.category);
  const sort = useSelector((state: RootState) => state.filters.sort);
  const dispatch = useAppDispatch();

  const totalPagesRef = useRef<number | null>(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      const queryString = QueryString.stringify({
        sortProperty: sort.sortProperty,
        category,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    if (window.location.search) {
      dispatch(
        setFilters({
          category,
          currentPage,
          sort: sort || sortList[0],
        }),
      );
    }

    isMountedRef.current = true;
  }, [sort.sortProperty, currentPage, category]);

  useEffect(() => {
    let ignore = false;

    const getAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          API.allProducts +
            `?_sort=${sort.sortProperty}&${category === "all" ? "" : `category=${category}&`}_page=${currentPage}&_per_page=${PER_PAGE}`,
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
  }, [currentPage, sort.sortProperty, category]);

  if (isLoading) {
    return <p className="font-bold">Loading...</p>;
  }
  return (
    <main>
      <div className="flex items-center gap-5 mt-2 mb-5">
        <h2>Home Page</h2>
        <Filters
          category={category}
          onClickCategory={(categoryName) =>
            dispatch(setCategory(categoryName))
          }
        />
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
        currentPage={currentPage}
        onChangePage={(page) => dispatch(setCurrentPage(page))}
      />
    </main>
  );
}

export const Component = HomePage;
