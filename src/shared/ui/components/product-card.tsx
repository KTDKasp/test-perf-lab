import type { Product } from "@/shared/types/product";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col items-center w-full h-fit">
      <div>
        <img className="mb-4" src={product.image} alt="Product Image" />
      </div>
      <div className="flex flex-col mb-4 justify-center gap-1 w-full">
        <span>Название: {product.name}</span>
        <span>Категория: {product.category}</span>
      </div>
      <div className="flex flex-col justify-center gap-1 w-full">
        {product.category === "food" && (
          <>
            <span>Вес: {product.weight}гр.</span>
            <span>Количество калорий: {product.calories}</span>
          </>
        )}
        {product.category === "clothing" && (
          <>
            <span>Размер: {product.size}</span>
            <span>Материал: {product.material}</span>
          </>
        )}
        {product.category === "electronics" && (
          <>
            <span>Бренд техники: {product.brand}</span>
            <span>Гарантия: {product.warrantyYears * 12} мес.</span>
          </>
        )}
      </div>
    </div>
  );
}
