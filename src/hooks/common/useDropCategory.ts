import { useEffect, useState } from "react";
import { Categories, CategoryBoolean, CategoryId } from "../../core/common/categories";
import { UpperCategoryType } from "../../type/common/category";

export default function useDropCategory() {
  const [categories, setCategories] = useState<Record<UpperCategoryType, boolean>>(CategoryBoolean);
  const [categoryText, setCategoryText] = useState("Select");

  useEffect(() => {
    Object.values(Categories).forEach((category) => {
      const upperCategory = category.toUpperCase() as UpperCategoryType;

      if (categories[upperCategory]) {
        setCategoryText(category);
        return;
      }
    });
  }, [categories]);

  function isSelectedNothing() {
    return categoryText === "Select";
  }

  function selectedCategoryNumber() {
    let categoryNumber: string = "-1";

    Object.keys(categories).forEach((category: string) => {
      if (categories[category as UpperCategoryType]) {
        categoryNumber = CategoryId[category as UpperCategoryType];
        return;
      }
    });

    return categoryNumber;
  }

  function isSelected(category: string) {
    const upperCategory = category.toUpperCase() as UpperCategoryType;
    return categories[upperCategory];
  }

  function selectCategory(category: string) {
    const tempCategory = { ...CategoryBoolean };
    tempCategory[category as UpperCategoryType] = true;

    setCategories({ ...tempCategory });
  }

  return {
    categories,
    isSelectedNothing,
    selectedCategoryNumber,
    isSelected,
    selectCategory,
    categoryText,
  };
}
