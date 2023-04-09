import styled from "styled-components";
import { PencilUpdateIc, TrashDeleteIc, SetIsTitleIc } from "../../assets";
import { profileCategory } from "../../core/constants/pageCategory";

import { useMutation, useQueryClient } from "react-query";
import { deletePortfolio, deleteTrack } from "../../core/api/delete";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginUserType } from "../../recoil/loginUserData";
import { PortfolioType } from "../../type/profilePropsType";
import { patchTitleAPI } from "../../core/api/profile";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { endPost } from "../../recoil/postIsCompleted";
import { VocalPortfolioType } from "../../type/vocalProfile";
import useInfiniteKey from "../../utils/hooks/useInfiniteKey";
import { ProducerPortfolioType } from "../../type/producerProfile";
import { showPlayerBar } from "../../recoil/player";

interface PropsType {
  isTitle: boolean;
  profileState: string;
  // ref: React.RefObject<HTMLDivElement>;
  portfolioId: number;
  portfoliosData: PortfolioType[];
  clickedPortfolioId: number;
  openEllipsisModal: boolean;
  setOpenEllipsisModal: React.Dispatch<React.SetStateAction<boolean>>;
  pauseAudio: any;
  setPortfolioData:
    | React.Dispatch<React.SetStateAction<VocalPortfolioType[]>>
    | React.Dispatch<React.SetStateAction<ProducerPortfolioType[]>>;
}

export default function PortfolioUpdateModal(props: PropsType) {
  const {
    isTitle,
    profileState,
    portfolioId,
    portfoliosData,
    clickedPortfolioId,
    openEllipsisModal,
    setOpenEllipsisModal,
    pauseAudio,
    setPortfolioData,
  } = props;
  const navigate = useNavigate();

  const loginUserType = useRecoilValue(LoginUserType);
  const queryClient = useQueryClient();
  const modalRef = useRef<HTMLDivElement>(null);
  const [isEnd, setIsEnd] = useRecoilState<boolean>(endPost);
  const { key, excuteGetData } = useInfiniteKey();
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  function askToDeleteTrack() {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      setPortfolioData([]);
      excuteGetData();
      profileState === "Portfolio" ? deletePortfolioTrack() : deleteVocalSearching();
    }
  }

  const { mutate: deleteVocalSearching } = useMutation(() => deleteTrack(portfoliosData[clickedPortfolioId].id), {
    onSuccess: () => {
      setShowPlayer(false);
      queryClient.invalidateQueries(key);
      setIsEnd(!isEnd);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: deletePortfolioTrack } = useMutation(() => deleteAPI(), {
    onSuccess: () => {
      setShowPlayer(false);
      queryClient.invalidateQueries(key);
      setIsEnd(!isEnd);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: patchTitle } = useMutation(
    () => patchTitleAPI(portfoliosData[0].id, portfoliosData[clickedPortfolioId].id, loginUserType),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(key);
        setIsEnd(!isEnd);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  async function deleteAPI() {
    if (isTitle && portfoliosData.length !== 1) {
      await patchTitleAPI(portfoliosData[0].id, portfoliosData[1].id, loginUserType);
      return deletePortfolio(portfolioId, loginUserType);
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
    pauseAudio();
    if (loginUserType === "producer") {
      if (profileState === profileCategory.PORTFOLIO) {
        navigate(`/portfolio-edit/producer/${portfolioId}`, {
          state: portfoliosData[clickedPortfolioId],
        });
      } else {
        navigate(`/track-post/edit/${portfolioId}`, { state: portfolioId });
      }
    } else {
      navigate(`/portfolio-edit/vocal/${portfolioId}`, {
        state: portfoliosData[clickedPortfolioId],
      });
    }
  }

  function isClickedOutside(e: MouseEvent) {
    return openEllipsisModal && !modalRef.current?.contains(e.target as Node);
  }

  function closeModal(e: MouseEvent) {
    pauseAudio();
    if (isClickedOutside(e)) {
      setOpenEllipsisModal(false);
    }
  }

  function checkShowTitleBox() {
    return !isTitle && !checkIsVocalSearching();
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openEllipsisModal]);

  return (
    <ModalWrapper
      ref={modalRef}
      isTitle={isTitle}
      checkIsPortfolio={checkIsPortfolio()}
      checkIsVocalSearching={checkIsVocalSearching()}
      checkShowTitleBox={checkShowTitleBox()}>
      <ModalBox underline={true} onClick={moveEditPage}>
        수정하기
        <PencilUpdateIcon />
      </ModalBox>
      {!checkIsVocalSearching() ? (
        <ModalBox underline={!isTitle} onClick={askToDeleteTrack}>
          삭제하기
          <TrashDeleteIcon />
        </ModalBox>
      ) : (
        <ModalBox underline={false} onClick={askToDeleteTrack}>
          삭제하기
          <TrashDeleteIcon />
        </ModalBox>
      )}
      {checkShowTitleBox() && (
        <ModalBox
          underline={false}
          onClick={() => {
            setPortfolioData([]);
            excuteGetData();
            patchTitle();
            setShowPlayer(false);
          }}>
          타이틀 설정
          <SetIsTitleIcon />
        </ModalBox>
      )}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div<{
  isTitle: boolean;
  checkIsPortfolio: boolean;
  checkIsVocalSearching: boolean;
  checkShowTitleBox: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  left: 17.2rem;
  margin-top: ${({ isTitle, checkIsVocalSearching }) => (isTitle || checkIsVocalSearching) && 16}rem;
  margin-top: ${({ isTitle, checkIsPortfolio }) => !isTitle && checkIsPortfolio && 21}rem;
  margin-top: ${({ isTitle, checkShowTitleBox }) => !isTitle && checkShowTitleBox && 21}rem;

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

const PencilUpdateIcon = styled(PencilUpdateIc)`
  width: 2.4rem;
  height: 2.4rem;
`;

const TrashDeleteIcon = styled(TrashDeleteIc)`
  width: 2.4rem;
  height: 2.4rem;
`;

const SetIsTitleIcon = styled(SetIsTitleIc)`
  width: 2.4rem;
  height: 2.4rem;
`;
