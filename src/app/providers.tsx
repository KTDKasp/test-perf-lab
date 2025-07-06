import { Provider as ReduxProvider } from "react-redux";
import { store } from "./rtk-store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
