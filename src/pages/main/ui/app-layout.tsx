import { toggleDrawer } from "@/app/rtk-store/cart.slice";
import { useAppDispatch, type RootState } from "@/app/rtk-store/store";
import { ROUTES } from "@/shared/api/routes";
import { Drawer } from "@/shared/ui/components/drawer";
import { OpenCartButton } from "@/shared/ui/components/open-cart-button";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function AppLayout() {
  const location = useLocation();

  const isDrawerOpen = useSelector((state: RootState) => state.cart.isDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        closeDrawer={() => dispatch(toggleDrawer(false))}
      />
      <header className="sticky top-0 w-full z-[5] bg-[rgba(255,255,255,0.7)] backdrop-blur-xs py-3">
        <nav className="flex justify-between items-center">
          {location.pathname === ROUTES.HOME ? (
            <h1 className="text-2xl font-bold cursor-default">DarkStore</h1>
          ) : (
            <Link to={ROUTES.HOME} className="text-2xl font-bold">
              DarkStore
            </Link>
          )}
          <Link to={ROUTES.FOOD}>Food</Link>
          <Link to={ROUTES.CLOTHING}>Clothing</Link>
          <Link to={ROUTES.ELECTRONICS}>Electronics</Link>
          <OpenCartButton />
        </nav>
      </header>
    </>
  );
}
