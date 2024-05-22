import { useEffect, useState } from 'react';
import { CategorySelectType } from '../../type/common/CategoryChecksType';
import { CategoryBoolean } from '../../core/common/categories';

export default function useSelectCategory() {
  const [isCategorySelected, setIsCategorySelected] = useState<CategorySelectType>(CategoryBoolean);
  const [categories, setCategories] = useState<Array<string>>([]);

  function handleSelectCategory(category: string) {
    setIsCategorySelected((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  }

  useEffect(() => {
    const tempArray: Array<string> = [];
    Object.keys(isCategorySelected).forEach((category) => {
      isCategorySelected[category] && tempArray.push(category);
    });
    setCategories([...tempArray]);
  }, [isCategorySelected]);

  return { categories, isCategorySelected, handleSelectCategory };
}
