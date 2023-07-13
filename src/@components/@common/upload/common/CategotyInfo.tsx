import styled from "styled-components";
import UploadInfoBox from "./UploadInfoBox";
import { CategoryDropDownIc, UploadCategoryIc } from "../../../../assets";
import { useState } from "react";

export default function CategoryInfo() {
  const [categoryState, setCategoryState] = useState(false);
  const [hiddenDropBox, setHiddenDropBox] = useState(true);

  function showDropBox(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    e.stopPropagation();
    setHiddenDropBox((prev) => !prev);
  }

  return (
    <>
      <UploadInfoBox>
        <InfoType>
          <UploadCategoryIc />
          <InfoTypeText>Category</InfoTypeText>
        </InfoType>
        <InfoInput>
          <InputWrapper>
            <InputCategoryTextWrapper categoryState={categoryState}>
              <InputCategoryText categoryState={categoryState} onClick={showDropBox}>
                {/* {uploadData.category} */}
              </InputCategoryText>
            </InputCategoryTextWrapper>
            <CategoryDropDownIcon onClick={showDropBox} />
          </InputWrapper>
        </InfoInput>
      </UploadInfoBox>

      {/* <DropMenuBox hiddenDropBox={hiddenDropBox} isVocal={isVocal(whom)}> */}
      <DropMenuBox hiddenDropBox={hiddenDropBox} isVocal={false}>
        <DropMenuWrapper>
          {/* {Object.values(Categories).map((text: string, index: number) => (
            <DropMenuItem
              checkState={checkState[index]}
              checkHoverState={checkHoverState[index]}
              onMouseEnter={(e) => hoverCategoryMenu(e, index)}
              onMouseLeave={(e) => hoverCategoryMenu(e, index)}
              onClick={(e) => selectedCategory(e, index)}
              ref={(element) => {
                categoryRefs.current[index] = element;
              }}>
              <DropMenuText>{text}</DropMenuText>
              {checkStateIcon[index] && <CheckCategoryIcon />}
            </DropMenuItem>
          ))} */}
        </DropMenuWrapper>
      </DropMenuBox>
    </>
  );
}
const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

const InfoTypeText = styled.p`
  margin-left: 1rem;
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;

// -------여기까지 공통----------

const InputWrapper = styled.div`
  display: flex;
`;

const InputCategoryTextWrapper = styled.div<{ categoryState: boolean }>`
  height: 4.2rem;
  width: 9.9rem;

  border-bottom: 0.1rem solid
    ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
`;

const InputCategoryText = styled.div<{ categoryState: boolean }>`
  height: 2rem;
  width: 100%;

  display: flex;
  align-items: center;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) => (props.categoryState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3)};
  margin-top: 1.5rem;
  cursor: pointer;
`;

const CategoryDropDownIcon = styled(CategoryDropDownIc)`
  width: 4rem;
  height: 4rem;
  margin-top: 0.9rem;
  cursor: pointer;
`;

const DropMenuBox = styled.div<{ hiddenDropBox: boolean; isVocal: boolean }>`
  display: ${(props) => (props.hiddenDropBox ? "none" : "default")};
  width: 13rem;

  position: absolute;
  top: ${({ isVocal }) => (isVocal ? 41 : 54)}rem;
  left: ${({ isVocal }) => (isVocal ? 96.5 : 109)}rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.65rem);
  border-radius: 0.5rem;
`;

const DropMenuWrapper = styled.ul`
  width: 100%;

  margin: 0.8rem 0;
`;

const DropMenuItem = styled.li<{ checkState: boolean; checkHoverState: boolean }>`
  height: 3.2rem;
  width: 9.3rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.fonts.hashtag};
  color: ${(props) =>
    props.checkState || props.checkHoverState ? ({ theme }) => theme.colors.white : ({ theme }) => theme.colors.gray3};
  margin: 0 1.9rem;
  cursor: pointer;
`;

const DropMenuText = styled.p`
  height: 2rem;
`;
