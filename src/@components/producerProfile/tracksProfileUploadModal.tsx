import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  PortfolioIc,
  PortfolioTextIc,
  ProducerProfileUploadeModalIc,
  VocalSearchingIc,
  VocalSearchingTextIc,
} from "../../assets";
import useModal from "../../hooks/common/useModal";

export default function TracksProfileUploadModal() {
  const navigate = useNavigate();
  const prevURL = useLocation().pathname;

  const { modalRef } = useModal();

  function moveVocalSearching() {
    navigate("/upload/producer/vocal-searching", {
      state: {
        prevURL: prevURL,
      },
    });
  }

  function movePortfolio() {
    navigate("/upload/producer/portfolio", {
      state: {
        prevURL: prevURL,
      },
    });
  }

  return (
    <>
      <UploadButtonModalWrapper>
        <ModalWrapper>
          <VocalSearchingWrapper onClick={moveVocalSearching}>
            <VocalSearchingIcon />
            <TextWrapper marginTop={2.7}>
              <VocalSearchingTextIcon />
              <Explain>보컬이 필요한 스케치곡</Explain>
            </TextWrapper>
          </VocalSearchingWrapper>
          <PortfolioWrapper onClick={movePortfolio}>
            <PortfolioIcon />
            <TextWrapper marginTop={13}>
              <PortfolioTextIcon />
              <Explain>감각을 보여줄 수 있는 작업물</Explain>
            </TextWrapper>
          </PortfolioWrapper>
          <ProducerProfileUploadeModalIcon />
        </ModalWrapper>
        <ModalBackgroundShadow ref={modalRef} />
      </UploadButtonModalWrapper>
    </>
  );
}

const ModalBackgroundShadow = styled.section`
  width: 192rem;
  height: 108rem;

  /* position: fixed; */
  background: rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.div`
  top: 12.5rem;
  right: 7.5rem;

  position: absolute;
  z-index: 8;

  cursor: pointer;
`;

const UploadButtonModalWrapper = styled.section`
  position: fixed;
  z-index: 2;
`;

const VocalSearchingWrapper = styled.article`
  position: absolute;
  z-index: 9;

  display: flex;
  padding-top: 1.5rem;
  /* top: 6rem; */
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  margin-top: 2.24rem;
  margin-left: 1.7rem;
`;

const PortfolioWrapper = styled.article`
  position: absolute;

  display: flex;
  /* top: 4rem; */
`;

const PortfolioIcon = styled(PortfolioIc)`
  margin-top: 12.5rem;
  margin-left: 1.7rem;
`;

const TextWrapper = styled.div<{ marginTop: number }>`
  margin-left: 1.4rem;
  margin-top: ${({ marginTop }) => marginTop}rem;
`;

const Explain = styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray3};
`;

const ProducerProfileUploadeModalIcon = styled(ProducerProfileUploadeModalIc)`
  width: 30.4rem;
  height: 19rem;
`;

const VocalSearchingTextIcon = styled(VocalSearchingTextIc)`
  width: 17.7rem;
  height: 2.2rem;
`;

const PortfolioTextIcon = styled(PortfolioTextIc)`
  width: 8.9rem;
  height: 2.2rem;
`;
