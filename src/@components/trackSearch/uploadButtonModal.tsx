import styled from "styled-components";
import { PortfolioIc, UnionIc, VocalSearchingIc, PortfolioTextIc, VocalSearchingTextIc } from "../../assets";

interface propsType {
  ref: React.RefObject<HTMLDivElement>;
}

export default function UploadButtonModal(props: propsType): JSX.Element {
  const { ref } = props;

  return (
    <UploadButtonModalWrapper ref={ref}>
      <VocalSearchingWrapper>
        <VocalSearchingIcon />
        <TextWrapper marginTop={2.1}>
          <VocalSearchingTextIc />
          <Explain>보컬이 필요한 스케치곡</Explain>
        </TextWrapper>
      </VocalSearchingWrapper>
      <PortfolioWrapper>
        <PortfolioIcon />
        <TextWrapper marginTop={10.2}>
          <PortfolioTextIc />
          <Explain>감각을 보여줄 수 있는 작업물</Explain>
        </TextWrapper>
      </PortfolioWrapper>

      <UnionIc />
    </UploadButtonModalWrapper>
  );
}

const UploadButtonModalWrapper = styled.section`
  position: fixed;
  z-index: 15;

  margin-top: 75.5rem;
  margin-left: 34.2rem;
`;

const VocalSearchingWrapper = styled.article`
  position: fixed;
  z-index: 16;

  display: flex;
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  margin-top: 2.24rem;
  margin-left: 3.4rem;
`;

const PortfolioWrapper = styled.article`
  position: fixed;
  z-index: 16;

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
