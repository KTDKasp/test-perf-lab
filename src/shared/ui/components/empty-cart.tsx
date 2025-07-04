import { toggleDrawer } from "@/app/rtk-store/cart.slice";
import { useAppDispatch } from "@/app/rtk-store/store";
import { cn } from "@/shared/lib/css";
import { ChevronLeft } from "lucide-react";

export function EmptyCart() {
  const dispatch = useAppDispatch();

  return (
    <div className="my-auto flex flex-col justify-center items-center gap-5">
      <img width="120px" src="/png/package-icon.png" alt="Empty Cart" />
      <h2 className="text-3xl font-semibold">Корзина пустая</h2>
      <p className="text-center opacity-40">
        Добавьте хотя бы один товар, чтобы оформить заказ.
      </p>
      <button
        onClick={() => dispatch(toggleDrawer(false))}
        className={cn(
          "flex items-center justify-center gap-[10px]",
          "w-full cursor-pointer bg-black text-white text-[14px] font-medium py-2 px-4 rounded-[8px] hover:bg-black/80",
        )}
      >
        <ChevronLeft size={16} />
        Вернуться назад
      </button>
    </div>
  );
}
