import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { PortfolioIc, UnionIc, VocalSearchingIc, PortfolioTextIc, VocalSearchingTextIc } from "../../assets";

interface propsType {
  ref: React.RefObject<HTMLDivElement>;
}

export default function UploadButtonModal(props: propsType): JSX.Element {
  const { ref } = props;
  const navigate = useNavigate();

  function moveVocalSearching() {
    navigate("/upload/Portfolio", { state: "Portfolio" });
  }

  function movePortfolio() {
    navigate("/upload/VocalSearching", { state: "VocalSearching" });
  }

  return (
    <ModalBg>
      <UploadButtonModalWrapper ref={ref}>
        <VocalSearchingWrapper onClick={moveVocalSearching}>
          <VocalSearchingIcon />
          <TextWrapper marginTop={2.1}>
            <VocalSearchingTextIc />
            <Explain>보컬이 필요한 스케치곡</Explain>
          </TextWrapper>
        </VocalSearchingWrapper>
        <PortfolioWrapper onClick={movePortfolio}>
          <PortfolioIcon />
          <TextWrapper marginTop={10.2}>
            <PortfolioTextIc />
            <Explain>감각을 보여줄 수 있는 작업물</Explain>
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
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  background-color: rgba(0, 0, 0, 0.6);
`;
const UploadButtonModalWrapper = styled.section`
  position: sticky;
  /* z-index: 15; */

  margin-top: 75.5rem;
  margin-left: 34.2rem;
`;

const VocalSearchingWrapper = styled.article`
  position: fixed;
  /* z-index: 16; */

  display: flex;
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  margin-top: 2.24rem;
  margin-left: 3.4rem;
`;

const PortfolioWrapper = styled.article`
  position: fixed;
  /* z-index: 16; */

  display: flex;
`;

const PortfolioIcon = styled(PortfolioIc)`
  margin-top: 10.2rem;
  margin-left: 3.4rem;
`;

const TextWrapper = styled.div<{ marginTop: number }>`
  margin-left: 1.4rem;
  margin-top: ${({ marginTop }) => marginTop}rem;
`;

const Title = styled.h1`
  ${({ theme }) => theme.fonts.cations};
  color: ${({ theme }) => theme.colors.white};
`;

const Explain = styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray3};
`;
