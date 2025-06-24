import { ROUTES } from "@/shared/api/routes";
import { Drawer } from "@/shared/ui/components/drawer";
import { Button } from "@/shared/ui/kit/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function AppLayout() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  return (
    <>
			{
				isDrawerOpen && (
					<Drawer closeDrawer={() => setIsDrawerOpen(false)} />
				)
			}
			<header>
      {location.pathname === ROUTES.HOME ? (
        <h1 className="text-2xl font-bold cursor-default">DarkStore</h1>
      ) : (
        <Link to={ROUTES.HOME} className="text-2xl font-bold">
          DarkStore
        </Link>
      )}
      <nav className="flex justify-between items-center w-[300px]">
        <Link to={ROUTES.FOOD}>Food</Link>
        <Link to={ROUTES.CLOTHING}>Clothing</Link>
        <Link to={ROUTES.ELECTRONICS}>Electronics</Link>
				<Button onClick={() => setIsDrawerOpen(true)}>Cart <ShoppingCart /></Button>
      </nav>
    </header>
		</>
  );
}
