import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc } from "../../assets";
import { profileCategory } from "../../core/constants/pageCategory";

interface PropsType {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProducerUploadModal(props: PropsType) {
  const { visible, setVisible } = props;
  const location = useLocation();
  const preLocation = location.pathname.split("/")[1];

  const navigate = useNavigate();
  const modalRef = useRef<HTMLUListElement>(null);

  function moveVocalSearching() {
    navigate("/upload/Vocal Searching", { state: { producerUploadType: "Vocal Searching", prevPage: preLocation } });
  }

  function movePortfolio() {
    navigate("/upload/Portfolio", { state: { producerUploadType: "Portfolio", prevPage: preLocation } });
  }

  function isClickedOutside(e: MouseEvent) {
    return visible && !modalRef.current?.contains(e.target as Node);
  }

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e)) {
      setVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [visible]);

  return (
    <ModalWrapper ref={modalRef}>
      <MoveTouploadVocalSearchingButtonIcon onClick={moveVocalSearching} />
      <MoveTouploadPortfolioButtonIcon onClick={movePortfolio} />
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
