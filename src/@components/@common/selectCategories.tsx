import { useState } from "react";

import { CategoryId, CategoryBoolean } from "../../core/common/categories";
import { CategorySelectType } from "../../type/common/CategoryChecksType";

import { CategoryTitleIc } from "../../assets";
import styled from "styled-components";

export default function SelectCategory() {
  const [isCategorySelected, setIsCategorySelected] = useState<CategorySelectType>(CategoryBoolean);

  function handleSelectCategory(category: string) {
    const tempSelected = isCategorySelected;
    tempSelected.category = !tempSelected.category;
    setIsCategorySelected({ ...tempSelected });
    // updateCategory(CategoryText[category]);
  }

  return (
    <>
      <CategoryContainer>
        <CategoryTitleIcon />
        <CategoryBox>
          {Object.keys(CategoryId).map((category: string, CategoryId: number) => {
            // if (categories.includes(CategoryText[category])) {
            //   isCategorySelected[category] = true;
            // }
            return (
              <CategoryItem
                key={CategoryId}
                isSelected={isCategorySelected[category]}
                onClick={() => handleSelectCategory(category)}>
                {category}
              </CategoryItem>
            );
          })}
        </CategoryBox>
      </CategoryContainer>
    </>
  );
}

const CategoryContainer = styled.article`
  width: 66rem;

  margin-top: 6.2rem;
  margin-left: 9rem;
`;

const CategoryBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme }) => theme.colors.gray4};

  ${({ theme }) => theme.fonts.hashtag}

  margin-top: 2.2rem;

  cursor: pointer;
`;

const CategoryItem = styled.li<{ isSelected: boolean }>`
  width: 25%;

  margin-bottom: 1.2rem;

  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray4)};
`;

const CategoryTitleIcon = styled(CategoryTitleIc)`
  width: 10.3rem;
`;
