import styled from "styled-components";
import { CategoryDropDownIc, UploadCategoryIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import DropCategory from "./dropCategory";
import { UpperCategoryType } from "../../type/common/category";
import useModal from "../../hooks/common/useModal";

interface CategoryInfoProps {
  categories: Record<UpperCategoryType, boolean>;
  setCategories: React.Dispatch<React.SetStateAction<Record<UpperCategoryType, boolean>>>;
  isSelectedNothing: () => boolean;
  isSelected: (category: string) => boolean;
  categoryText: string;
}

export default function CategoryInfo(props: CategoryInfoProps) {
  const { categories, setCategories, isSelectedNothing, categoryText } = props;
  const { openModal, handleShowUpdateModal } = useModal();

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>
          <UploadCategoryIcon />
        </InfoTypeIconWrapper>
        <InfoTypeText>Category</InfoTypeText>
      </InfoType>

      <InfoInput>
        <InputWrapper>
          <InputCategoryTextWrapper isSelectedNothing={isSelectedNothing()}>
            <InputCategoryText isSelectedNothing={isSelectedNothing()} onClick={handleShowUpdateModal}>
              {categoryText}
            </InputCategoryText>
          </InputCategoryTextWrapper>
          <CategoryDropDownIcon onClick={handleShowUpdateModal} />
        </InputWrapper>
      </InfoInput>
      <DropCategory
        categories={categories}
        setCategories={setCategories}
        openModal={openModal}
        handleShowUpdateModal={handleShowUpdateModal}
      />
    </UploadInfoBox>
  );
}
export const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 27.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.cations};
`;

export const InfoTypeText = styled.p``;

export const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

export const InfoTypeIconWrapper = styled.div`
  width: 2.23rem;
`;

// -------여기까지 공통----------

const InputWrapper = styled.div`
  display: flex;
`;

const InputCategoryTextWrapper = styled.div<{ isSelectedNothing: boolean }>`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 0.1rem solid
    ${(props) => (props.isSelectedNothing ? ({ theme }) => theme.colors.gray3 : ({ theme }) => theme.colors.white)};
`;

const InputCategoryText = styled.div<{ isSelectedNothing: boolean }>`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) =>
    props.isSelectedNothing ? ({ theme }) => theme.colors.gray3 : ({ theme }) => theme.colors.white};
  margin-top: 1.5rem;
  cursor: pointer;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  width: 4rem;
  height: 4rem;
  margin-top: 0.9rem;
  cursor: pointer;
`;

const UploadCategoryIcon = styled(UploadCategoryIc)`
  width: 1.23rem;
`;
