import { useAppDispatch, type RootState } from "@/app/rtk-store/store";
import { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "../kit/button";
import { toggleDrawer } from "@/app/rtk-store/cart.slice";

export const OpenCartButton = memo(function OpenCartButton() {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();

  const itemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);
  return (
    <div className="header__cart">
      <Button
        className="cursor-pointer"
        onClick={() => dispatch(toggleDrawer(true))}
      >
        Cart {itemsCount}
      </Button>
    </div>
  );
});
