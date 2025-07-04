import { toggleDrawer } from "@/app/rtk-store/cart.slice";
import { useAppDispatch, useAppSelector } from "@/app/rtk-store/store";
import { ROUTES } from "@/shared/api/routes";
import { cn } from "@/shared/lib/css";
import { Drawer } from "@/shared/ui/components/drawer";
import { OpenCartButton } from "@/shared/ui/components/open-cart-button";
import { Button } from "@/shared/ui/kit/button";
import { Link, useLocation } from "react-router-dom";

export function AppLayoutHeader() {
  const location = useLocation();

  const isDrawerOpen = useAppSelector(state => state.cart.isDrawerOpen);
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer
        isOpen={isDrawerOpen}
        closeDrawer={() => dispatch(toggleDrawer(false))}
      />
      <header className="sticky top-0 w-full z-[5] bg-[rgba(255,255,255,0.7)] backdrop-blur-xs p-4">
        <nav className="container flex justify-evenly gap-4 items-center mx-auto">
          {location.pathname === ROUTES.HOME ? (
            <h1 className="text-2xl font-bold cursor-default">DarkStore</h1>
          ) : (
            <Link
              to={ROUTES.HOME}
              className={cn(
                "text-black relative text-2xl font-bold",
                "before:content-[''] before:w-full before:h-[3px] before:absolute before:bg-black",
                "before:bottom-0 before:left-0 before:origin-right before:[transform:scaleX(0)] before:transition-transform",
                "hover:before:origin-left hover:before:[transform:scaleX(1)]",
              )}
            >
              DarkStore
            </Link>
          )}
          <div className="flex gap-4">
            <Button
              asChild
              variant={location.pathname === ROUTES.FOOD ? "default" : "link"}
              className="text-lg rounded-lg border border-gray-300"
            >
              <Link to={ROUTES.FOOD}>Еда</Link>
            </Button>
            <Button
              asChild
              variant={
                location.pathname === ROUTES.CLOTHING ? "default" : "link"
              }
              className="text-lg rounded-lg border border-gray-300"
            >
              <Link to={ROUTES.CLOTHING}>Одежда</Link>
            </Button>

            <Button
              asChild
              variant={
                location.pathname === ROUTES.ELECTRONICS ? "default" : "link"
              }
              className="text-lg rounded-lg border border-gray-300"
            >
              <Link to={ROUTES.ELECTRONICS}>Электроника</Link>
            </Button>
          </div>

          <OpenCartButton />
        </nav>
      </header>
    </>
  );
}
