import type { SortType } from "@/app/rtk-store/filters.slice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../kit/select";
import { sortList } from "@/shared/utils/constants";

type SelectSortProps = {
  sortValue: SortType;
  onChangeSort: (value: SortType) => void;
};

export function SelectSort({ sortValue, onChangeSort }: SelectSortProps) {
  return (
    <Select
      onValueChange={(value: SortType["sortProperty"]) =>
        onChangeSort({ name: sortValue.name, sortProperty: value })
      }
    >
      <SelectTrigger className="w-[200px] cursor-pointer">
        <SelectValue placeholder={sortValue.name || "Выберите сортировку"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортировать:</SelectLabel>
          {sortList.map((sort) => (
            <SelectItem key={sort.sortProperty} value={sort.sortProperty}>
              {sort.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
