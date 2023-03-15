import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  VocalSearchingIc,
  PortfolioIc,
  VocalSearchingTextIc,
  PortfolioTextIc,
  ProducerProfileUploadeModalIc,
} from "../../assets";
import { uploadButtonClicked } from "../../recoil/uploadButtonClicked";
import { useSetRecoilState } from "recoil";

export default function TracksProfileUploadModal() {
  const navigate = useNavigate();
  const setVisible = useSetRecoilState<boolean>(uploadButtonClicked);

  function moveVocalSearching() {
    navigate("/upload/Vocal Searching", { state: "Vocal Searching" });
  }

  function movePortfolio() {
    navigate("/upload/Portfoilo", { state: "Portfoilo" });
  }

  function clickOutside() {
    setVisible(false);
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
        <ModalBackgroundShadow onClick={clickOutside}></ModalBackgroundShadow>
      </UploadButtonModalWrapper>
    </>
  );
}

const ModalBackgroundShadow = styled.section`
  width: 192rem;
  height: 108rem;

  background: rgba(0, 0, 0, 0.6);
`;

const ModalWrapper = styled.div`
  margin: 12.5rem 0 0 156.1rem;

  position: absolute;
  z-index: 10;
`;

const UploadButtonModalWrapper = styled.section`
  position: fixed;
  z-index: 10;
`;

const VocalSearchingWrapper = styled.article`
  position: absolute;
  z-index: 13;

  display: flex;
  margin-top: 2.1rem;
`;

const VocalSearchingIcon = styled(VocalSearchingIc)`
  margin-top: 2.24rem;
  margin-left: 1.7rem;
`;

const PortfolioWrapper = styled.article`
  position: absolute;

  display: flex;
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

const ProducerProfileUploadeModalIcon=styled(ProducerProfileUploadeModalIc)`
  width: 30.4rem;
 
  @media (min-width:1200px) and (max-width:1799px){
      margin-top: -2rem;
    }

`

const VocalSearchingTextIcon=styled(VocalSearchingTextIc)`
  width: 17.7rem;
  height: 2.2rem;
`

const PortfolioTextIcon=styled(PortfolioTextIc)`
  width: 8.9rem;
  height: 2.2rem;
`