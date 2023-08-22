import { useState } from "react";

import { CategoryId, CategoryBoolean } from "../../core/common/categories";
import { CategorySelectType } from "../../type/common/CategoryChecksType";

import { CategoryTitleIc } from "../../assets";
import styled from "styled-components";

export default function SelectCategory() {
  const [isCategorySelected, setIsCategorySelected] = useState<CategorySelectType>(CategoryBoolean);

  function handleSelectCategory(category: string) {
    setIsCategorySelected((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  }

  return (
    <>
      <CategoryContainer>
        <CategoryTitleIcon />
        <CategoryBox>
          {Object.keys(CategoryId).map((category: string, CategoryId: number) => {
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

  margin-top: 2.2rem;

  ${({ theme }) => theme.fonts.hashtag}
  color: ${({ theme }) => theme.colors.gray4};
  align-items: center;

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
