import { AppLayoutFooter } from "@/pages/main/ui/app-layout-footer";
import { AppLayoutHeader } from "@/pages/main/ui/app-layout-header";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <div className="bg-white min-h-dvh flex flex-col">
      <AppLayoutHeader />
      <Outlet />
      <AppLayoutFooter />
    </div>
  );
}
