import type { CartProduct } from "@/app/rtk-store/cart.slice";

export function calcTotalPrice(items: CartProduct[]) {
  return Number(items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2));
}
