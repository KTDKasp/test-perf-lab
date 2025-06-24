import { X } from "lucide-react";

type DrawerProps = {
  closeDrawer: () => void;
};

export function Drawer({ closeDrawer }: DrawerProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 h-full w-full bg-black opacity-65 z-10"></div>
      <div className="fixed top-0 right-0 flex flex-col w-[400px] h-full bg-white z-20 p-8">
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
      </div>
    </>
  );
}
