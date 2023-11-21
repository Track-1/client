import styled from "styled-components";
import { CategoryId } from "../../core/common/categories";
import { CategorySelectType } from "../../type/common/CategoryChecksType";
import InputContainer from "../@common/inputContainer";

interface SelectCategoryProps {
  isCategorySelected: CategorySelectType;
  handleSelectCategory: (category: string) => void;
}

export default function ProfileSelectCategoryEdit(props: SelectCategoryProps) {
  const { isCategorySelected, handleSelectCategory } = props;

  return (
    <CategoryContainer>
      <InputContainer title="Category">
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
      </InputContainer>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  margin-bottom: 6.2rem;
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
