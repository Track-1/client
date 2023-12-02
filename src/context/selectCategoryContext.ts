import { createContext } from "react";
import { CategoryIdType } from "../type/common/category";

export const SelectCategoryContext = createContext<{
  selectedOption: CategoryIdType | null;
  selectOption: (option: CategoryIdType | null) => void;
}>({
  selectedOption: null,
  selectOption: (option: CategoryIdType | null) => {},
});
