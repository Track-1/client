import styled from "styled-components";
import { Categories, CategoryBoolean, CategoryText } from "../../core/common/categories";
import { UpperCategoryType } from "../../type/common/category";
import { CheckCategoryIc } from "../../assets";

interface DropCategoryProps {
  categories: Record<UpperCategoryType, boolean>;
  setCategories: React.Dispatch<React.SetStateAction<Record<UpperCategoryType, boolean>>>;
  hiddenDropBox: boolean;
}

export default function DropCategory(props: DropCategoryProps) {
  const { categories, setCategories, hiddenDropBox } = props;

  function selectCategory(category: string) {
    const tempCategory = { ...CategoryBoolean };
    tempCategory[category as UpperCategoryType] = true;

    setCategories({ ...tempCategory });
  }

  function isSelected(category: string) {
    return categories[category as UpperCategoryType];
  }

  return (
    <DropMenuBox hiddenDropBox={hiddenDropBox} isVocal={false}>
      <DropMenuWrapper>
        {Object.keys(CategoryText).map((category: string) => (
          <DropMenuItem onClick={() => selectCategory(category)} key={category}>
            <DropMenuText>{CategoryText[category as UpperCategoryType]}</DropMenuText>
            {isSelected(category) && <CheckCategoryIcon />}
          </DropMenuItem>
        ))}
      </DropMenuWrapper>
    </DropMenuBox>
  );
}

const DropMenuBox = styled.div<{ hiddenDropBox: boolean; isVocal: boolean }>`
  display: ${(props) => (props.hiddenDropBox ? "none" : "block")};
  width: 13rem;

  position: absolute;
  /* top: ${({ isVocal }) => (isVocal ? 41 : 54)}rem;
  left: ${({ isVocal }) => (isVocal ? 96.5 : 109)}rem; */
  top: 57.3rem;
  left: 103rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.65rem);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 3.2rem;
  width: 9.3rem;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray3};

  margin: 0 1.9rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const DropMenuText = styled.p`
  height: 2rem;
`;

const CheckCategoryIcon = styled(CheckCategoryIc)`
  width: 1.5rem;
`;
