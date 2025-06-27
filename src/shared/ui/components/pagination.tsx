import { Button } from "../kit/button";

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
  return (
    <ul className="flex items-center gap-1 p-5">
      {[...Array(totalPages)].map((_, i) => (
        <Button
          asChild
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => onChangePage(i + 1)}
          className="cursor-pointer"
          key={i}
        >
          <span>{i + 1}</span>
        </Button>
      ))}
    </ul>
  );
}
