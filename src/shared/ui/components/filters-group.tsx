import type { FilterCategory } from "@/shared/types/filters";
import { Button } from "../kit/button";

type FiltersProps = {
  category: FilterCategory;
  onClickCategory: (name: FilterCategory) => void;
};

const categoryList: { key: FilterCategory; value: string }[] = [
  { key: "all", value: "Все" },
  { key: "clothing", value: "Одежда" },
  { key: "electronics", value: "Электроника" },
  { key: "food", value: "Еда" },
];

export function Filters({ category, onClickCategory }: FiltersProps) {
  return (
    <ul className="flex gap-2">
      {categoryList.map(({ key, value }) => (
        <li key={key}>
          <Button
            variant={category === key ? "default" : "outline"}
            onClick={() => onClickCategory(key)}
          >
            {value}
          </Button>
        </li>
      ))}
    </ul>
  );
}
