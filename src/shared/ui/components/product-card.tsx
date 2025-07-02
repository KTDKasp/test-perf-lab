import { addToCart } from "@/app/rtk-store/cart.slice";
import { useAppDispatch } from "@/app/rtk-store/store";
import type { Product } from "@/shared/types/product";
import { Button } from "../kit/button";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex flex-col items-center w-full h-fit p-3 [border:1px_solid_#333333] rounded-2xl">
      <div>
        <img className="mb-4" src={product.image} alt="Product Image" />
      </div>
      <div className="flex flex-col mb-4 justify-center gap-1 w-full">
        <span>Название: {product.name}</span>
        <span>Категория: {product.category}</span>
      </div>
      <div className="flex w-full justify-between items-center">
        <span className="font-bold">{product.price.toFixed(2)} ₽</span>
        <Button
          onClick={() => dispatch(addToCart(product))}
          className="cursor-pointer"
        >
          В корзину
        </Button>
      </div>
    </div>
  );
}
