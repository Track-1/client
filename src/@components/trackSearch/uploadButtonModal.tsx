import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PortfolioIc, UnionIc, VocalSearchingIc, PortfolioTextIc, VocalSearchingTextIc } from "../../assets";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";

export default function UploadButtonModal() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  const modalRef = useRef<HTMLDivElement>(null);

  function moveVocalSearching() {
    navigate("/upload/Vocal Searching", { state: { producerUploadType: "Vocal Searching", prevPage: `/trackSearch` } });
  }

  function movePortfolio() {
    navigate("/upload/Portfolio", { state: { producerUploadType: "Portfolio", prevPage: `/trackSearch` } });
  }

  function isClickedOutside(e: MouseEvent) {
    return openModal && !modalRef.current?.contains(e.target as Node);
  }

  function closeModal(e: MouseEvent) {
    if (isClickedOutside(e)) {
      setOpenModal(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", closeModal);
    return () => {
      document.removeEventListener("mousedown", closeModal);
    };
  }, [openModal]);

  return (
    <ModalBg>
      <UploadButtonModalWrapper ref={modalRef}>
        <VocalSearchingWrapper>
          <VocalSearchingIcon />
          <TextWrapper marginTop={2.5}>
            <div onClick={moveVocalSearching}>
              <VocalSearchingTextIcon />
              <Explain>보컬이 필요한 스케치곡</Explain>
            </div>
          </TextWrapper>
        </VocalSearchingWrapper>
        <PortfolioWrapper>
          <PortfolioIcon />
          <TextWrapper marginTop={10.7}>
            <div onClick={movePortfolio}>
              <PortfolioTextIcon />
              <Explain>감각을 보여줄 수 있는 작업물</Explain>
            </div>
          </TextWrapper>
        </PortfolioWrapper>
        <UnionIcon />
      </UploadButtonModalWrapper>
    </ModalBg>
  );
}

const ModalBg = styled.section`
  /* height: 100vh;
  width: 100vw; */
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const UploadButtonModalWrapper = styled.section`
  position: sticky;
  margin-top: 75.5rem;
  margin-left: 34.2rem;
  pointer-events: none;
`;

const VocalSearchingWrapper = styled.article`
  position: fixed;
  display: flex;

  cursor: pointer;
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  width: 4rem;
  margin-top: 2.24rem;
  margin-left: 3.4rem;

  cursor: pointer;
`;

const PortfolioWrapper = styled.article`
  position: fixed;
  display: flex;

  cursor: pointer;
`;

const PortfolioIcon = styled(PortfolioIc)`
  width: 4rem;
  margin-top: 10.2rem;
  margin-left: 3.4rem;

  cursor: pointer;
`;

const TextWrapper = styled.div<{ marginTop: number }>`
  margin-left: 1.4rem;
  margin-top: ${({ marginTop }) => marginTop}rem;
  pointer-events: auto;
  cursor: pointer;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.cations};
  color: ${({ theme }) => theme.colors.white};
`;

const Explain = styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray3};
`;

const UnionIcon = styled(UnionIc)`
  width: 30.4rem;

  @media (min-width: 1200px) and (max-width: 1799px) {
    margin-top: -2rem;
  }
`;

const VocalSearchingTextIcon = styled(VocalSearchingTextIc)`
  width: 17.7rem;
  height: 2.2rem;
`;

const PortfolioTextIcon = styled(PortfolioTextIc)`
  width: 8.9rem;
  height: 2.2rem;
`;
