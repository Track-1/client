import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilUpdateIc, TrashDeleteIc, SetIsTitleIc } from "../../assets";
import { profileCategory } from "../../core/constants/pageCategory";
import { PortfolioType } from "../../type/profilePropsType";

interface PropsType {
  isTitle: boolean;
  profileState: string;
  ref: React.RefObject<HTMLDivElement>;
  portfolios: PortfolioType;
}

export default function PortfolioUpdateModal(props: PropsType) {
  const { isTitle, profileState, portfolios } = props;
  const navigate = useNavigate();

  function checkIsVocalSearching() {
    return profileState === profileCategory.VOCAL_SEARCHING;
  }

  function checkIsPortfolio() {
    return profileState === profileCategory.PORTFOLIO;
  }

  function moveEditPage() {
    navigate(`/portfolio-edit/${2}`, {
      state: portfolios,
    });
  }

  return (
    <ModalWrapper
      isTitle={isTitle}
      checkIsPortfolio={checkIsPortfolio()}
      checkIsVocalSearching={checkIsVocalSearching()}>
      <ModalBox underline={true}>
        <div onClick={moveEditPage}>
          수정하기
          <PencilUpdateIc />
        </div>
      </ModalBox>
      {!checkIsVocalSearching() ? (
        <ModalBox underline={!isTitle}>
          삭제하기
          <TrashDeleteIc />
        </ModalBox>
      ) : (
        <ModalBox underline={false}>
          삭제하기
          <TrashDeleteIc />
        </ModalBox>
      )}
      {!isTitle && !checkIsVocalSearching() && (
        <ModalBox underline={false}>
          타이틀 설정
          <SetIsTitleIc />
        </ModalBox>
      )}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div<{ isTitle: boolean; checkIsPortfolio: boolean; checkIsVocalSearching: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  left: 17.2rem;
  margin-top: ${({ isTitle, checkIsVocalSearching }) => (isTitle || checkIsVocalSearching) && 16}rem;
  margin-top: ${({ isTitle, checkIsPortfolio }) => !isTitle && checkIsPortfolio && 21}rem;

  width: 20.1rem;

  ${({ theme }) => theme.fonts.comment}
  color:${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray4};
  border-radius: 0.5rem;
`;

const ModalBox = styled.div<{ underline: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 20.1rem;
  height: 5.6rem;
  padding: 1.1rem 1.9rem;
  border-bottom: 0.1rem solid ${({ underline, theme }) => (underline ? theme.colors.gray3 : "transparent")};
`;
