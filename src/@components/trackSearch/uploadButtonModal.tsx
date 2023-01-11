import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioIc, UnionIc, VocalSearchingIc, PortfolioTextIc, VocalSearchingTextIc } from "../../assets";
import { uploadButtonClickedInTrackList } from "../../recoil/uploadButtonClicked";

interface propsType {
  ref: React.RefObject<HTMLDivElement>;
}

// export default function UploadButtonModal(props: propsType): JSX.Element {
//   const { ref } = props;
export default function UploadButtonModal() {
  const [openModal, setOpenModal] = useRecoilState<boolean>(uploadButtonClickedInTrackList);
  const modalRef = useRef<HTMLDivElement>(null);

  function clickOutside(){
    setOpenModal(false)
  }

  // useEffect(() => {
  //   document.addEventListener("mousedown", closeModal);
  //   return () => {
  //     document.removeEventListener("mousedown", closeModal);
  //   };
  // }, [openModal]);

  // function closeModal(e: MouseEvent) {
  //   if (isClickedOutside(e)) {
  //     setOpenModal(false);
  //   }
  // }
  
  // function clickUploadButton() {
  //   setOpenModal(true);
  // }

  // function isClickedOutside(e: MouseEvent) {
  //   return openModal && !modalRef.current?.contains(e.target as Node);
  // }

  function clickVocalSearching(){
    
  }

  function clickPortfolio(){

  }

  return (

    <ModalBg onClick={clickOutside}>
      <UploadButtonModalWrapper>
        <VocalSearchingWrapper>
          <VocalSearchingIcon />
          <TextWrapper marginTop={2.5}>
            <div onClick={clickVocalSearching}>
            <VocalSearchingTextIc />
            <Explain>보컬이 필요한 스케치곡</Explain>
            </div>
          </TextWrapper>
        </VocalSearchingWrapper>
        <PortfolioWrapper>
          <PortfolioIcon />
          <TextWrapper marginTop={10.7}>
          <div onClick={clickPortfolio}>
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
