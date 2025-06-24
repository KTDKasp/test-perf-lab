import { AppLayout } from "@/pages/main/ui/app-layout";
import { Outlet } from "react-router-dom";

export function App() {

  return (
    <div className="min-h-dvh flex flex-col max-w-7xl mx-auto">
      <AppLayout />
      <Outlet />
    </div>
  )
}
