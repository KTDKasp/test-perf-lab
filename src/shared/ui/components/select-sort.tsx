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

type SelectSortProps = {
  sortValue: SortType;
  onChangeSort: (value: SortType) => void;
};

const sortList: SortType[] = [
  { name: "по названию (A-Z)", sortProperty: "name" },
  { name: "по названию (Z-A)", sortProperty: "-name" },
  { name: "по возрастанию цены", sortProperty: "price" },
  { name: "по убыванию цены", sortProperty: "-price" },
];

export function SelectSort({ sortValue, onChangeSort }: SelectSortProps) {
  return (
    <Select onValueChange={(value: SortType["sortProperty"]) => onChangeSort({name: sortValue.name, sortProperty: value})}>
      <SelectTrigger className="w-[200px] cursor-pointer">
        <SelectValue placeholder={sortValue.name || "Выберите сортировку"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Сортировать:</SelectLabel>
          {sortList.map((sort) => (
            <SelectItem
              key={sort.sortProperty}
              value={sort.sortProperty}
            >
              {sort.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
