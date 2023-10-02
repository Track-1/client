import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PencilUpdateIc, SetIsTitleIc, TrashDeleteIc } from "../../assets";
import useModal from "../../hooks/common/useModal";
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
  const { modalRef } = useModal();
  const { deleteVocalPortfolio } = useDeleteVocalPortfolio();
  const { deleteProducerPortfolio } = useDeleteProducerPortfolio();
  const { editVocalTitle } = useEditVocalTitle();
  const { editProducerTitle } = useEditProducerTitle();
  function handleMoveToEditPage() {
    navigate(`portfolio-edit/vocal/${portfolioId}`);
  }

  function handleAskToDeleteTrack() {
    if (window.confirm("Are you sure you want to delete the post?\n게시글을 삭제하시겠습니까?")) {
      if (nowTitleId === portfolioId) {
        if (dataState === "vocal portfolio") {
          editVocalTitle({
            bef: nowTitleId,
            aft: nowTitleNextId,
          });
        } else {
          editProducerTitle({ bef: nowTitleId, aft: nowTitleNextId });
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
    <ModalWrapper ref={modalRef}>
      <ModalBox underline={true} onClick={handleMoveToEditPage}>
        수정하기
        <PencilUpdateIcon />
      </ModalBox>
      <ModalBox underline={false} onClick={handleAskToDeleteTrack}>
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
  );
}

const ModalWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
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
