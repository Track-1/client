import { createContext } from 'react';
import { CategoryIdType, EventCategoryIdType } from '../type/common/category';

export const SelectCategoryContext = createContext<{
  selectedOption: CategoryIdType | EventCategoryIdType | null;
  selectOption: (option: CategoryIdType | EventCategoryIdType | null) => void;
}>({
  selectedOption: null,
  selectOption: (option: CategoryIdType | EventCategoryIdType | null) => {},
});
