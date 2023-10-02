import styled from "styled-components";
import { CategoryBoolean, CategoryText } from "../../core/common/categories";
import { UpperCategoryType } from "../../type/common/category";
import { CheckCategoryIc } from "../../assets";

interface DropCategoryProps {
  categories: Record<UpperCategoryType, boolean>;
  setCategories: React.Dispatch<React.SetStateAction<Record<UpperCategoryType, boolean>>>;
  openModal: boolean;
  handleShowUpdateModal: () => void;
}

export default function DropCategory(props: DropCategoryProps) {
  const { categories, setCategories, openModal, handleShowUpdateModal } = props;

  function selectCategory(category: string) {
    const tempCategory = { ...CategoryBoolean };
    tempCategory[category as UpperCategoryType] = true;

    setCategories({ ...tempCategory });
  }

  function isSelected(category: string) {
    return categories[category as UpperCategoryType];
  }

  function handleItemClick(category: string) {
    selectCategory(category);
    handleShowUpdateModal();
  }

  return (
    <>
      {openModal && (
        <DropMenuBox isVocal={false}>
          <DropMenuWrapper>
            {Object.keys(CategoryText).map((category: string) => (
              <DropMenuItem onClick={() => handleItemClick(category)} key={category}>
                <DropMenuText isSelected={isSelected(category)}>
                  {CategoryText[category as UpperCategoryType]}
                </DropMenuText>
                {isSelected(category) && <CheckCategoryIcon />}
              </DropMenuItem>
            ))}
          </DropMenuWrapper>
        </DropMenuBox>
      )}
    </>
  );
}

const DropMenuBox = styled.div<{ isVocal: boolean }>`
  width: 13rem;

  position: absolute;
  top: ${({ isVocal }) => (isVocal ? 41 : 57.3)}rem;
  left: ${({ isVocal }) => (isVocal ? 96.5 : 103)}rem;

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

const DropMenuText = styled.p<{ isSelected: boolean }>`
  height: 2rem;

  color: ${(props) => (props.isSelected ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};

  &:hover {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const CheckCategoryIcon = styled(CheckCategoryIc)`
  width: 1.5rem;
`;
