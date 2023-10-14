import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilUpdateIc, SetIsTitleIc, TrashDeleteIc } from "../../assets";
import useUpdateModal from "../../hooks/common/useUpdateModal";
import {
  useDeleteProducerPortfolio,
  useDeleteVocalPortfolio,
  useEditProducerTitle,
  useEditVocalTitle,
} from "../../hooks/queries/mypage";

interface PortfolioUpdateModalProp {
  isTitle: boolean;
  nowTitleId: number;
  nowTitleNextId: number;
  portfolioId: number;
  dataState: string;
}

export default function PortfolioUpdateModal(props: PortfolioUpdateModalProp) {
  const { isTitle, nowTitleId, nowTitleNextId, portfolioId, dataState } = props;
  const navigate = useNavigate();
  const { deleteVocalPortfolio } = useDeleteVocalPortfolio();
  const { deleteProducerPortfolio } = useDeleteProducerPortfolio();
  const [isDelete, setIsDelete] = useState(false);
  const { editVocalTitle } = useEditVocalTitle();
  const { editProducerTitle } = useEditProducerTitle();
  const { modalRef, unShowModal } = useUpdateModal();
  // const { deletFirstVocal } = useDeleteFirstVocalPortfolio(
  //   {
  //     bef: nowTitleId,
  //     aft: nowTitleNextId,
  //   },
  //   deleteVocalPortfolio(portfolioId),
  // );
  // const { deleteFirstProducer } = useDeleteFirstProducerPortfolio(
  //   {
  //     bef: nowTitleId,
  //     aft: nowTitleNextId,
  //   },
  //   deleteProducerPortfolio(portfolioId),
  // );
  // console.log(dataState);

  function handleMoveToEditPage() {
    switch (dataState) {
      case "producer vocal searching":
        navigate(`/vocal-searching-edit/producer/${portfolioId}`);
        return;
      case "producer portfolio":
        navigate(`/portfolio-edit/producer/${portfolioId}`);
        return;
      case "vocal portfolio":
        navigate(`/portfolio-edit/vocal/${portfolioId}`);
        return;
      default:
        return;
    }
  }

  function handleAskToDeleteTrack() {
    if (window.confirm("Are you sure you want to delete the post?\n게시글을 삭제하시겠습니까?")) {
      if (dataState === "producer vocal searching") {
        deleteProducerPortfolio(portfolioId);
        return;
      }
      //타이틀곡을 삭제하려는 경우
      if (nowTitleId === portfolioId) {
        if (dataState === "vocal portfolio") {
          // deletFirstVocal();
        } else {
          // deleteFirstProducer();
        }
      } else {
        if (dataState === "vocal portfolio") {
          deleteVocalPortfolio(portfolioId);
        } else {
          deleteProducerPortfolio(portfolioId);
        }
      }
    }
  }

  function handleChangeTitle() {
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
