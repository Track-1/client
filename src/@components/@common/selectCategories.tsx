import { useState } from "react";

import { CategoryBoolean, CategoryId } from "../../core/common/categories";
import { CategorySelectType } from "../../type/common/CategoryChecksType";

import styled from "styled-components";
import { CategoryTitleIc } from "../../assets";
import InputTitle from "./inputTitle";

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
        <InputTitle>Category</InputTitle>
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
  width: 55.9rem;
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
