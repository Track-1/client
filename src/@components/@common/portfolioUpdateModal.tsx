import styled from "styled-components";
import { PencilUpdateIc, TrashDeleteIc, SetIsTitleIc } from "../../assets";
import { profileCategory } from "../../core/constants/pageCategory";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteProducerPortfolio, deleteVocalPortfolio } from "../../core/api/delete";
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { UserType } from "../../recoil/main";

interface PropsType {
  isTitle: boolean;
  profileState: string;
  ref: React.RefObject<HTMLDivElement>;
  portfolioId: number;
}

export default function PortfolioUpdateModal(props: PropsType) {
  const { isTitle, profileState, portfolioId } = props;
  const navigate = useNavigate();

  const userType = useRecoilValue(UserType);

  const { mutate } = useMutation(deleteAPI, {
    onSuccess: () => {
      alert("성공!!");
      navigate(-1);
    },
    onError: (error) => {
      console.log("에러!!", error);
    },
  });

  async function deleteAPI() {
    if (userType === "Tracks") {
      return await deleteProducerPortfolio(portfolioId);
    } else {
      return await deleteVocalPortfolio(portfolioId);
    }
  }

  function checkIsVocalSearching() {
    return profileState === profileCategory.VOCAL_SEARCHING;
  }

  function checkIsPortfolio() {
    return profileState === profileCategory.PORTFOLIO;
  }

  function requestDelete() {
    mutate();
  }

  return (
    <ModalWrapper
      isTitle={isTitle}
      checkIsPortfolio={checkIsPortfolio()}
      checkIsVocalSearching={checkIsVocalSearching()}>
      <ModalBox underline={true}>
        수정하기
        <PencilUpdateIc />
      </ModalBox>
      {!checkIsVocalSearching() ? (
        <ModalBox underline={!isTitle} onClick={requestDelete}>
          삭제하기
          <TrashDeleteIc />
        </ModalBox>
      ) : (
        <ModalBox underline={false} onClick={requestDelete}>
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

  cursor: pointer;
`;
