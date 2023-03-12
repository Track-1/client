import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilUpdateIc, TrashDeleteIc, SetIsTitleIc } from "../../assets";
import { profileCategory } from "../../core/constants/pageCategory";

import { useMutation } from "react-query";
import { deletePortfolio, deleteTitlePortfolio } from "../../core/api/delete";
import { useRecoilValue } from "recoil";
import { LoginUserType } from "../../recoil/loginUserData";
import { PortfolioType } from "../../type/profilePropsType";
import { patchTitleAPI } from "../../core/api/profile";

import { PortfolioType } from "../../type/profilePropsType";


interface PropsType {
  isTitle: boolean;
  profileState: string;
  ref: React.RefObject<HTMLDivElement>;
  portfolioId: number;
  portfoliosData: PortfolioType[];
  clickedPortfolioId: number;
}

export default function PortfolioUpdateModal(props: PropsType) {
  const { isTitle, profileState, portfolioId, portfoliosData, clickedPortfolioId } = props;
  console.log(portfoliosData);

  const loginUserType = useRecoilValue(LoginUserType);

  const { mutate: deleteTrack } = useMutation(() => deleteAPI(), {
    onSuccess: () => {
      //성공하고 업로드 다시 되어야하는거 구현해야돼!
      alert("삭제 성공");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: patchTitle } = useMutation(
    () => patchTitleAPI(portfoliosData[0].id, portfoliosData[clickedPortfolioId].id, loginUserType),
    {
      onSuccess: (data) => {
        alert("타이틀변경 성공");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  function deleteAPI() {
    if (isTitle && portfoliosData.length !== 1) {
      patchTitleAPI(portfoliosData[0].id, portfoliosData[1].id, loginUserType);
      alert("확인");
      return deleteTitlePortfolio(portfolioId, loginUserType);
    } else {
      return deletePortfolio(portfolioId, loginUserType);
    }
  }
  
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
        <ModalBox underline={!isTitle} onClick={() => deleteTrack()}>
          삭제하기
          <TrashDeleteIc />
        </ModalBox>
      ) : (
        <ModalBox underline={false} onClick={() => deleteTrack()}>
          삭제하기
          <TrashDeleteIc />
        </ModalBox>
      )}
      {!isTitle && !checkIsVocalSearching() && (
        <ModalBox underline={false} onClick={() => patchTitle()}>
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
