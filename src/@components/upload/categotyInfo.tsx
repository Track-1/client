import styled from "styled-components";
import { CategoryDropDownIc, UploadCategoryIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import DropCategory from "./dropCategory";
import { UpperCategoryType } from "../../type/common/category";

interface CategoryInfoProps {
  categories: Record<UpperCategoryType, boolean>;
  setCategories: React.Dispatch<React.SetStateAction<Record<UpperCategoryType, boolean>>>;
  isSelectedNothing: () => boolean;
  isSelected: (category: string) => boolean;
  categoryText: string;
  hiddenDropBox: boolean;
  showDropBox: (e: React.MouseEvent<HTMLDivElement | SVGSVGElement, MouseEvent>) => void;
}

export default function CategoryInfo(props: CategoryInfoProps) {
  const { categories, setCategories, isSelectedNothing, categoryText, hiddenDropBox, showDropBox } = props;

  return (
    <>
      <UploadInfoBox>
        <InfoType>
          <InfoTypeIconWrapper>
            <UploadCategoryIcon />
          </InfoTypeIconWrapper>
          <InfoTypeText>Category</InfoTypeText>
        </InfoType>
        <InfoInput isProfile={false}>
          <InputWrapper>
            <InputCategoryTextWrapper isSelectedNothing={isSelectedNothing()}>
              <InputCategoryText isSelectedNothing={isSelectedNothing()} onClick={showDropBox}>
                {categoryText}
              </InputCategoryText>
            </InputCategoryTextWrapper>
            <CategoryDropDownIcon onClick={showDropBox} />
          </InputWrapper>
        </InfoInput>
        <DropCategory categories={categories} setCategories={setCategories} hiddenDropBox={hiddenDropBox} />
      </UploadInfoBox>
    </>
  );
}
export const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

export const InfoTypeText = styled.p`
  margin-left: 1rem;
`;

export const InfoInput = styled.div<{ isProfile: boolean }>`
  display: flex;
  justify-content: space-between;

  flex-direction: ${({ isProfile }) => isProfile && "column"};
  align-items: ${({ isProfile }) => (isProfile ? "flex-end" : "center")};

  margin-top: ${({ isProfile }) => isProfile && -1.8}rem;
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
