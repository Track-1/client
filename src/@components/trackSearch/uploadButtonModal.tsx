import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { PortfolioIc, PortfolioTextIc, UnionIc, VocalSearchingIc, VocalSearchingTextIc } from "../../assets";
import useModal from "../../hooks/common/useModal";

export default function UploadButtonModal() {
  const navigate = useNavigate();
  const { modalRef } = useModal();

  function moveVocalSearching() {
    navigate("/upload/producer/vocal-searching", {
      state: { producerUploadType: "Vocal Searching", prevPage: `/trackSearch` },
    });
  }

  function movePortfolio() {
    navigate("/upload/producer/portfolio", { state: { producerUploadType: "Portfolio", prevPage: `/trackSearch` } });
  }

  return (
    <>
      <UploadButtonModalWrapper>
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
      <ModalBg ref={modalRef} />
    </>
  );
}

const ModalBg = styled.section`
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const UploadButtonModalWrapper = styled.section`
  position: absolute;
  z-index: 3;
  top: 75.5rem;
  left: 34.2rem;
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
