import { Button } from "../kit/button";
import { useMemo, type ReactNode } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useAppSelector } from "@/app/rtk-store/store";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

export function Pagination({
  currentPage,
  onChangePage,
  totalPages,
}: PaginationProps) {
  const loading = useAppSelector(state => state.products.loading);

  const renderPageNumbers = useMemo(() => {
    const items: ReactNode[] = [];

    items.push(
      <Button
        key="first-page"
        onClick={() => onChangePage(1)}
        variant={currentPage === 1 ? "default" : "outline"}
        className="cursor-pointer"
      >
        <span>1</span>
      </Button>,
    );

    if (currentPage > 3) {
      items.push(
        <Button
          asChild
          variant={"ghost"}
          className="pointer-events-none"
          key="ellipsis-start"
        >
          <span>...</span>
        </Button>,
      );
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      items.push(
        <Button
          key={i}
          asChild
          onClick={() => onChangePage(i)}
          variant={currentPage === i ? "default" : "outline"}
          className="cursor-pointer"
        >
          <span>{i}</span>
        </Button>,
      );
    }

    if (currentPage < totalPages - 2) {
      items.push(
        <Button
          asChild
          variant={"ghost"}
          className="pointer-events-none"
          key="ellipsis-end"
        >
          <span>...</span>
        </Button>,
      );
    }

    if (!loading) {
      items.push(
        <Button
          key="last-page"
          onClick={() => onChangePage(totalPages)}
          variant={currentPage === totalPages ? "default" : "outline"}
          className="cursor-pointer"
        >
          {totalPages}
        </Button>,
      );
    }

    return items;
  }, [totalPages, currentPage, onChangePage]);

  return (
    <div className="flex items-center gap-1 p-5">
      <Button
        variant="outline"
        onClick={() => onChangePage(currentPage - 1)}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      >
        <ChevronLeftIcon />
      </Button>
      {renderPageNumbers}
      <Button
        variant="outline"
        onClick={() => onChangePage(currentPage + 1)}
        className={
          currentPage === totalPages ? "pointer-events-none opacity-50" : ""
        }
      >
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
