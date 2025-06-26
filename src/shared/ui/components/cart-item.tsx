import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "../kit/button";
import {
  addToCart,
  deleteItemFromCart,
  subtractFromCart,
  type CartProduct,
} from "@/app/rtk-store/cart.slice";
import { memo, type HTMLAttributes } from "react";
import { useAppDispatch } from "@/app/rtk-store/store";

type CartItemProps = CartProduct & HTMLAttributes<HTMLDivElement>;
export const CartItem = memo(function CartItem({
  id,
  image,
  name,
  price,
  quantity,
  category,
}: CartItemProps) {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <img
        src={image}
        alt={name}
        width={80}
        height={80}
        className="rounded-md object-cover"
      />
      <div className="flex-1 space-y-2">
        <div>
          <h4 className="font-medium text-sm">{name}</h4>
          <p className="font-semibold text-sm">{price.toFixed(2)} ₽</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
            disabled={quantity === 1}
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => dispatch(subtractFromCart(id))}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                dispatch(addToCart({ id, image, name, price, category }))
              }
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-700"
            onClick={() => dispatch(deleteItemFromCart(id))}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
});
