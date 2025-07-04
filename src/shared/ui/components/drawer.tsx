import { useAppDispatch, useAppSelector } from "@/app/rtk-store/store";
import { cn } from "@/shared/lib/css";
import { X } from "lucide-react";
import type { HTMLAttributes } from "react";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/api/routes";
import { clearCart, toggleDrawer } from "@/app/rtk-store/cart.slice";
import { EmptyCart } from "./empty-cart";

type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  closeDrawer: () => void;
};

export function Drawer({ closeDrawer, isOpen }: DrawerProps) {
  const { cartItems, totalPrice: cartTotalPrice } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const createOrder = () => {
    dispatch(toggleDrawer(false));
    dispatch(clearCart());
    navigate(ROUTES.SUCCESS_ORDER);
  };

  return (
    <div
      className={cn({
        ["opacity-[0] z-[-5]"]: !isOpen,
      })}
    >
      <div
        onClick={closeDrawer}
        className={cn(
          "fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-[rgba(0,0,0,0.6)] opacity-[0] z-10 transition-opacity",
          {
            ["opacity-[1]"]: isOpen,
          },
        )}
      ></div>
      <div
        className={cn(
          "fixed top-0 right-0 flex flex-col w-[400px] h-full bg-white z-20 p-8 [transform:translateX(400px)] [transition:transform_0.15s_ease]",
          {
            ["[transform:translateX(0px)]"]: isOpen,
          },
        )}
      >
        <div className="flex items-center gap-[10px] mb-7">
          <button
            onClick={closeDrawer}
            className="w-6 h-6 cursor-pointer transition-transform hover:rotate-90 hover:bg-[none]"
            aria-label="Close cart"
          >
            <X />
          </button>
          <h2>Корзина</h2>
        </div>

        {cartItems.length > 0 ? (
          <>
            <ul className="flex flex-col gap-4 overflow-y-auto flex-[1] mb-7">
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <li key={item.id}>
                    <CartItem {...item} />
                  </li>
                ))}
            </ul>
            <div className="flex items-center mb-6">
              <span>Итого:</span>
              <span className="flex-[1] border-[1px_dashed_#d7d7d7]"></span>
              <span>{cartTotalPrice || 0} ₽</span>
            </div>
            <button
              onClick={createOrder}
              className="w-full cursor-pointer bg-black text-white text-[14px] font-medium py-2 px-4 rounded-[8px] hover:bg-black/80"
            >
              Оформить заказ
            </button>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}
