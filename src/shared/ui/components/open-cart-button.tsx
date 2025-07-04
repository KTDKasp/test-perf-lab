import { useAppDispatch, useAppSelector } from "@/app/rtk-store/store";
import { memo } from "react";
import { Button } from "../kit/button";
import { toggleDrawer } from "@/app/rtk-store/cart.slice";

export const OpenCartButton = memo(function OpenCartButton() {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const itemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <div className="header__cart">
      <Button
        className="cursor-pointer"
        onClick={() => dispatch(toggleDrawer(true))}
      >
        Корзина {itemsCount}
      </Button>
    </div>
  );
});
