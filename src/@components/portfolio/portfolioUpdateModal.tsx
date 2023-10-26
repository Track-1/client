import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilUpdateIc, SetIsTitleIc, TrashDeleteIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import useModal from "../../hooks/common/useModal";
import useUpdateModal from "../../hooks/common/useUpdateModal";
import {
  deleteFirstProducer,
  deleteFirstVocal,
  useDeleteProducerPortfolio,
  useDeleteVocalPortfolio,
  useEditProducerTitle,
  useEditVocalTitle,
} from "../../hooks/queries/mypage";
import { useDeleteTrack } from "../../hooks/queries/tracks";
import { ProducerVocalSearchingType, UserPortfolioType } from "../../type/profile";

interface PortfolioUpdateModalProp {
  isTitle: boolean;
  nowTitleId: number;
  nowTitleNextId: number;
  portfolioId: number;
  dataState: string;
  clickedPortfolio?: UserPortfolioType;
  clickedProducerVocalSearching?: ProducerVocalSearchingType;
}

export default function PortfolioUpdateModal(props: PortfolioUpdateModalProp) {
  const {
    isTitle,
    nowTitleId,
    nowTitleNextId,
    portfolioId,
    dataState,
    clickedPortfolio,
    clickedProducerVocalSearching,
  } = props;
  const navigate = useNavigate();
  const { deleteVocalPortfolio } = useDeleteVocalPortfolio();
  const { deleteProducerPortfolio } = useDeleteProducerPortfolio();
  const { deleteTrack } = useDeleteTrack();
  const [isDelete, setIsDelete] = useState(false);
  const { editVocalTitle } = useEditVocalTitle();
  const { editProducerTitle } = useEditProducerTitle();
  const { unShowModal } = useModal();
  const { modalRef, unShowModal: unShowUpdateModal } = useUpdateModal();
  const { quitAudioForMovePage } = useContext(PlayerContext);
  const prevURL = useLocation().pathname;

  function handleMoveToEditPage() {
    quitAudioForMovePage();
    switch (dataState) {
      case "producer portfolio":
        navigate(`/portfolio-edit/producer/${portfolioId}`, {
          state: {
            prevURL: prevURL,
            uploadEditInitData: clickedPortfolio,
          },
        });
        break;
      case "producer vocal searching":
        navigate(`/vocal-searching-edit/producer/${portfolioId}`, {
          state: {
            prevURL: prevURL,
            uploadEditInitData: clickedProducerVocalSearching,
          },
        });
        break;
      case "vocal portfolio":
        navigate(`/portfolio-edit/vocal/${portfolioId}`, {
          state: {
            prevURL: prevURL,
            uploadEditInitData: clickedPortfolio,
          },
        });
        break;
      default:
        break;
    }
  }

  async function handleAskToDeleteTrack() {
    quitAudioForMovePage();
    if (window.confirm("Are you sure you want to delete the post?\n게시글을 삭제하시겠습니까?")) {
      if (dataState === "producer vocal searching") {
        deleteTrack(portfolioId);
      }
      //타이틀곡을 삭제하려는 경우
      if (nowTitleId === portfolioId) {
        if (dataState === "vocal portfolio") {
          deleteFirstVocal({ bef: nowTitleId, aft: nowTitleNextId }, portfolioId);
        } else {
          deleteFirstProducer({ bef: nowTitleId, aft: nowTitleNextId }, portfolioId);
        }
      }
      // 타이틀 곡 아닌 곡을 삭제하려는 경우
      else {
        if (dataState === "vocal portfolio") {
          deleteVocalPortfolio(portfolioId);
        } else {
          deleteProducerPortfolio(portfolioId);
        }
      }
      unShowModal();
      unShowUpdateModal();
    }
  }

  function handleChangeTitle() {
    quitAudioForMovePage();
    if (dataState === "vocal portfolio") {
      editVocalTitle({
        bef: nowTitleId,
        aft: portfolioId,
      });
    } else if (dataState === "producer portfolio") {
      editProducerTitle({ bef: nowTitleId, aft: portfolioId });
    }
  }

  return (
    <>
      <ModalWrapper>
        <ModalBox underline={true} onClick={handleMoveToEditPage}>
          수정하기
          <PencilUpdateIcon />
        </ModalBox>
        <ModalBox underline={dataState !== "producer vocal searching" && !isTitle} onClick={handleAskToDeleteTrack}>
          삭제하기
          <TrashDeleteIcon />
        </ModalBox>
        {dataState !== "producer vocal searching" && !isTitle && (
          <ModalBox underline={false} onClick={handleChangeTitle}>
            타이틀 설정
            <SetIsTitleIcon />
          </ModalBox>
        )}
      </ModalWrapper>
      <UpdateModalBackground ref={modalRef} />
    </>
  );
}

const UpdateModalBackground = styled.div`
  width: 120vw;
  margin-left: calc(-120.7vw);
  margin-right: calc(-10vw);
  margin-top: calc(-50vw);
  height: 200vw;
  text-align: center;

  z-index: 1;
`;

const ModalWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  z-index: 5;
  left: 17.2rem;

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
