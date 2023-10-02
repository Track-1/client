import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc } from "../../assets";
import useModal from "../../hooks/common/useModal";

export default function ProducerUploadModal() {
  const { modalRef, closeModal, openModal } = useModal();
  const location = useLocation();
  const preLocation = location.pathname.split("/")[1];
  const navigate = useNavigate();

  function handleMoveVocalSearching() {
    navigate("/upload/producer/vocal-searching", {
      state: { producerUploadType: "Vocal Searching", prevPage: preLocation },
    });
  }

  function handleMovePortfolio() {
    navigate("/upload/producer/portfolio", { state: { producerUploadType: "Portfolio", prevPage: preLocation } });
  }

  return (
    <>
      <ModalWrapper>
        <MoveTouploadVocalSearchingButtonIcon onClick={handleMoveVocalSearching} />
        <MoveTouploadPortfolioButtonIcon onClick={handleMovePortfolio} />
      </ModalWrapper>
      <ModalBackground ref={modalRef} />
    </>
  );
}

const ModalBackground = styled.div`
  position: absolute;
  width: 120vw;
  height: 100vw;

  margin-left: calc(-50vw);
  margin-top: calc(-60vw);
`;

const ModalWrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin: 2.5rem 0 0 13.6rem;
  position: absolute;
  z-index: 2;

  cursor: pointer;
`;

const MoveTouploadVocalSearchingButtonIcon = styled(MoveTouploadVocalSearchingButtonIc)`
  width: 28.4rem;
  height: 10.6rem;
`;

const MoveTouploadPortfolioButtonIcon = styled(MoveTouploadPortfolioButtonIc)`
  width: 28.4rem;
  height: 8.4rem;
`;
