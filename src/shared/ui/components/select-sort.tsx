import type { SelectHTMLAttributes } from "react";
import { ChevronDownIcon } from "lucide-react";
import type { FilterSortType } from "@/shared/types/filters";
import { cn } from "@/shared/lib/css";
import { sortList } from "@/shared/utils/constants";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  sortValue: FilterSortType["sortProperty"];
  onChangeSort: (value: FilterSortType) => void;
};

export function SelectSort({ sortValue, onChangeSort, ...props }: SelectProps) {
  return (
    <div className="flex items-center relative cursor-pointer">
      <select
        name="sort"
        value={sortValue}
        onChange={(e) =>
          onChangeSort({
            name:
              sortList.find((sort) => sort.sortProperty === e.target.value)
                ?.name || "",
            sortProperty: e.target.value as FilterSortType["sortProperty"],
          })
        }
        className={cn(
          "text-black cursor-pointer block w-full appearance-none rounded-lg border-1 p-[5px_28px_5px_12px] bg-white text-sm/6",
          "*:text-black",
        )}
        {...props}
      >
        <option disabled>Сортировать:</option>
        {sortList.map((sort) => (
          <option key={sort.name} value={`${sort.sortProperty}`}>
            {sort.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none w-[30px] h-full flex items-center justify-center absolute right-0 rounded-r-lg">
        <ChevronDownIcon
          className="size-4 fill-white/60"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
