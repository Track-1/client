import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc } from "../../assets";
import useModal from "../../hooks/common/useModal";
import { isModalOpen } from "../../recoil/common/isModalOpen";

export default function ProducerUploadModal() {
  const [isOpenModal, setIsOpenModal] = useRecoilState(isModalOpen);
  const { modalRef, closeModal, openModal } = useModal();
  const location = useLocation();
  const preLocation = location.pathname.split("/")[1];
  const navigate = useNavigate();

  function handleMoveVocalSearching() {
    navigate("/upload/Vocal Searching", { state: { producerUploadType: "Vocal Searching", prevPage: preLocation } });
  }

  function handleMovePortfolio() {
    navigate("/upload/Portfolio", { state: { producerUploadType: "Portfolio", prevPage: preLocation } });
  }

  return (
    <ModalWrapper ref={modalRef}>
      <MoveTouploadVocalSearchingButtonIcon onClick={handleMoveVocalSearching} />
      <MoveTouploadPortfolioButtonIcon onClick={handleMovePortfolio} />
    </ModalWrapper>
  );
}

const ModalWrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin: 2.5rem 0 0 13.6rem;

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
