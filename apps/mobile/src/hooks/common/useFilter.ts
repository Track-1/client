import { useState } from 'react';
import { CategoryType } from '../../type/common/category';
import { LowerCategoryId } from '../../core/common/categories';
import { useNavigate } from 'react-router-dom';
import { updateQueryParams } from '../../utils/common/queryString';

export function useFilter() {
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  function handleSelectCategory() {
    const categString = updateQueryParams('categ', Array.from(selectedCategory));

    navigate(categString);
  }

  function selectCategory(category: CategoryType) {
    const tempCategory = new Set(selectedCategory);

    if (tempCategory.has(LowerCategoryId[category])) {
      tempCategory.delete(LowerCategoryId[category]);
    } else {
      tempCategory.add(LowerCategoryId[category]);
    }

    setSelectedCategory(tempCategory);
  }

  //이 코드도 너무 더럽다.... 더 좋게 만들 수 있는 방법을 공부해보자...!!!
  function removeCategory(category: CategoryType) {
    const tempCategory = new Set(selectedCategory);

    tempCategory.delete(LowerCategoryId[category]);

    setSelectedCategory(tempCategory);

    const categString = updateQueryParams('categ', Array.from(tempCategory));

    navigate(categString);
  }

  function resetCategory() {
    const tempCategory = new Set<string>();
    setSelectedCategory(tempCategory);
  }

  return { selectedCategory, selectCategory, removeCategory, handleSelectCategory, resetCategory };
}
