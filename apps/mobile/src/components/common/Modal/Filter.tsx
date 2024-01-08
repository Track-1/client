import styled, { css } from 'styled-components';
import BottomUpModal from '../Interface/bottomUpModal';
import { Categories, LowerCategoryId } from '../../../core/common/categories';
import { PageType } from '../../../type/common/pageType';
import Text from '../Text';
import { CategoryType } from '../../../type/common/category';
import { CategoryCheckedIc, ResetBtnIc } from '../../../assets';
import { theme } from '../../../style/theme';

interface FilterModalProps {
  openModal: boolean;
  showModal: () => void;
  unShowModal: () => void;
  pageType: PageType;
  selectCategory: (category: CategoryType) => void;
  selectedCategory: Set<string>;
  handleSelectCategory: () => void;
  resetCategory: () => void;
}

export default function FilterModal(props: FilterModalProps) {
  const {
    openModal,
    showModal,
    unShowModal,
    pageType,
    selectCategory,
    selectedCategory,
    handleSelectCategory,
    resetCategory,
  } = props;

  return (
    <>
      <BottomUpModal openModal={openModal} showModal={showModal} unShowModal={unShowModal}>
        <ModalTitle>
          <Text as="h3" font="Pre_16_M" color="gray3">
            Category
          </Text>
        </ModalTitle>
        <CategorList>
          {Categories.map((category) => (
            <CategoryItem
              pageType={pageType}
              isChecked={selectedCategory.has(LowerCategoryId[category])}
              onClick={() => {
                selectCategory(category);
              }}>
              {category}
              {selectedCategory.has(LowerCategoryId[category]) && (
                <CategoryCheckedIc
                  stroke={pageType === 'tracks' ? `${theme.colors.neon_green}` : `${theme.colors.neon_pink}`}
                />
              )}
            </CategoryItem>
          ))}
        </CategorList>
        <SelectButtonWrapper pageType={pageType}>
          <SelectButton
            pageType={pageType}
            onClick={() => {
              handleSelectCategory();
              unShowModal();
            }}>
            {`Select ${selectedCategory.size > 0 ? selectedCategory.size : ''}`}
          </SelectButton>
          <ResetButton onClick={resetCategory}>
            <ResetBtnIc fill={pageType === 'tracks' ? `${theme.colors.neon_green}` : `${theme.colors.neon_pink}`} />
          </ResetButton>
        </SelectButtonWrapper>
      </BottomUpModal>
    </>
  );
}

const ModalTitle = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  margin-bottom: 2.5rem;
`;

const CategorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  width: 100%;

  padding: 0 3rem;

  margin-bottom: 3.3rem;
`;

const CategoryItem = styled.li<{ pageType: PageType; isChecked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 3.7rem;

  ${({ theme }) => theme.fonts.Pre_18_R};

  color: ${({ theme }) => theme.colors.gray2};

  ${({ pageType, isChecked }) =>
    pageType === 'tracks' &&
    isChecked &&
    css`
      color: ${({ theme }) => theme.colors.neon_green};
    `}

  ${({ pageType, isChecked }) =>
    pageType === 'vocals' &&
    isChecked &&
    css`
      color: ${({ theme }) => theme.colors.neon_pink};
    `}

    & > button {
    ${({ pageType, isChecked }) =>
      pageType === 'tracks' &&
      (isChecked
        ? css`
            color: ${({ theme }) => theme.colors.neon_green};
          `
        : css`
            color: ${({ theme }) => theme.colors.neon_green};
            display: none;
          `)}

    ${({ pageType, isChecked }) =>
      pageType === 'vocals' &&
      (isChecked
        ? css`
            color: ${({ theme }) => theme.colors.neon_pink};
          `
        : css`
            color: ${({ theme }) => theme.colors.neon_pink};
            display: none;
          `)}
  }
`;

const SelectButtonWrapper = styled.div<{ pageType: PageType }>`
  display: flex;

  width: 100%;
  height: 6.8rem;

  border-top: 1px solid
    ${({ theme, pageType }) => (pageType === 'tracks' ? theme.colors.neon_green : theme.colors.neon_pink)};
`;
const SelectButton = styled.button<{ pageType: PageType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: calc(100% - 6.8rem);
  height: 100%;

  ${({ theme }) => theme.fonts.Alex_20_R};
  color: ${({ theme }) => theme.colors.black};

  background-color: ${({ theme, pageType }) =>
    pageType === 'tracks' ? theme.colors.neon_green : theme.colors.neon_pink};
`;

const ResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 6.8rem;
  height: 100%;

  background-color: ${({ theme }) => theme.colors.gray4};
`;
