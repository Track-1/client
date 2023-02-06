import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PortfolioIc, UnionIc, VocalSearchingIc, PortfolioTextIc, VocalSearchingTextIc } from "../../assets";
import useModal from "../../utils/hooks/useModal";

export default function UploadButtonModal() {
  const navigate = useNavigate();

  const { modalRef } = useModal();

  function moveVocalSearching() {
    navigate("/upload/Vocal Searching", { state: "Vocal Searching" });
  }

  function movePortfolio() {
    navigate("/upload/Portfoilo", { state: "Portfoilo" });
  }

  return (
    <ModalBg>
      <UploadButtonModalWrapper ref={modalRef}>
        <VocalSearchingWrapper>
          <VocalSearchingIcon />
          <TextWrapper marginTop={2.5}>
            <div onClick={moveVocalSearching}>
              <VocalSearchingTextIc />
              <Explain>보컬이 필요한 스케치곡</Explain>
            </div>
          </TextWrapper>
        </VocalSearchingWrapper>
        <PortfolioWrapper>
          <PortfolioIcon />
          <TextWrapper marginTop={10.7}>
            <div onClick={movePortfolio}>
              <PortfolioTextIc />
              <Explain>감각을 보여줄 수 있는 작업물</Explain>
            </div>
          </TextWrapper>
        </PortfolioWrapper>
        <UnionIc />
      </UploadButtonModalWrapper>
    </ModalBg>
  );
}

const ModalBg = styled.section`
  height: 100vh;
  width: 100vw;

  position: fixed;
  z-index: 10000;
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
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  margin-top: 2.24rem;
  margin-left: 3.4rem;
`;

const PortfolioWrapper = styled.article`
  position: fixed;

  display: flex;
`;

const PortfolioIcon = styled(PortfolioIc)`
  margin-top: 10.2rem;
  margin-left: 3.4rem;
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
