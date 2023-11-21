import styled from "styled-components";
import { CategoryDropDownIc, UploadCategoryIc } from "../../assets";
import UploadInfoBox from "./uploadInfoBox";
import DropCategory from "./dropCategory";
import { Select } from "../@common/selectBox";
import { ReversedCategoryId } from "../../core/common/categories";
import { CategoryIdType } from "../../type/common/category";
import { useContext } from "react";
import { SelectCategoryContext } from "../../context/formContextWithProps";

export default function CategoryInfo() {
  const { selectedOption, selectOption } = useContext(SelectCategoryContext);

  function selectCategory(option: number | null) {
    selectOption(String(option) as CategoryIdType);
  }
  return (
    <Select externalSelectState={selectCategory}>
      <UploadInfoBox>
        <InfoType>
          <InfoTypeIconWrapper>
            <UploadCategoryIcon />
          </InfoTypeIconWrapper>
          <p>Category</p>
        </InfoType>

        <InfoInput>
          <InputWrapper>
            <InputCategoryTextWrapper isSelectedNothing={selectedOption === null}>
              <Select.Trigger asChild>
                <InputCategoryText isSelectedNothing={selectedOption === null}>
                  {selectedOption === null ? "Select" : ReversedCategoryId[selectedOption]}
                </InputCategoryText>
              </Select.Trigger>
            </InputCategoryTextWrapper>
            <Select.Trigger asChild>
              <CategoryDropDownIcon />
            </Select.Trigger>
          </InputWrapper>
        </InfoInput>
        <DropCategory />
      </UploadInfoBox>
    </Select>
  );
}
const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 27.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.cations};
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

const InfoTypeIconWrapper = styled.div`
  width: 2.23rem;
`;

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
