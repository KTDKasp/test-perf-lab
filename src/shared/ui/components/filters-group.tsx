import type { Category } from "@/app/rtk-store/filters.slice";
import { Button } from "../kit/button";

type FiltersProps = {
  category: Category;
  onClickCategory: (name: Category) => void;
};

const categoryList: { key: Category; value: string }[] = [
  { key: "all", value: "Все" },
  { key: "clothing", value: "Одежда" },
  { key: "electronics", value: "Электроника" },
  { key: "food", value: "Еда" },
];

export function Filters({ category, onClickCategory }: FiltersProps) {
  return (
    <ul className="flex">
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
