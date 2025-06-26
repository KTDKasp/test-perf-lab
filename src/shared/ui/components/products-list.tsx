import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import type { Product } from "@/shared/types/product";
import type { fetchMetadata } from "@/shared/types/metadata";
import { API } from "@/shared/lib/api";

type ProductsListProps = {
  page: number;
};


export function ProductsList({ page }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    const getAllProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(
          API.allProducts + `?_page=${page}&_per_page=${PER_PAGE}`,
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch products, status: ${res.status}`);
        }
        const fetchData = (await res.json()) as fetchMetadata;
        if (ignore) {
          return;
        }
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
  }, [page]);

  if (isLoading) {
    return <p className="font-bold">Loading...</p>;
  }

  return (
    <>
      
    </>
  );
}
