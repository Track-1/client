import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Footer from "../@common/footer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { MainTracksTextIc, MainVocalsTextIc } from "../../assets";
import hoverTracksBackground from "../../assets/image/hoverTracksImg.png";
import hoverVocalsBackground from "../../assets/image/hoverVocalsImg.png";
import originBackground from "../../assets/image/mainBackgroundImg.png";
import mainSloganImg from "../../assets/image/mainSloganImg.png";
import { openConventionModal } from "../../recoil/common/conventionModal";
import ConventionModal from "../@common/conventionModal";
import Header from "../@common/header";
import Ads from "./ads";
import LoginButton from "./loginButton";

export default function Main() {
  const showModal = useRecoilValue(openConventionModal);
  const navigate = useNavigate();
  const [isWhatHover, setIsWhatHover] = useState("");

  useEffect(() => {
    // localStorage.removeItem("recoil-persist");
    // setSelectedCategorys([
    //   { categId: 0, selected: false },
    //   { categId: 1, selected: false },
    //   { categId: 2, selected: false },
    //   { categId: 3, selected: false },
    //   { categId: 4, selected: false },
    //   { categId: 5, selected: false },
    //   { categId: 6, selected: false },
    //   { categId: 7, selected: false },
    //   { categId: 8, selected: false },
    //   { categId: 9, selected: false },
    // ]);
  }, []);

  function handleMoveToVocals() {
    navigate("/vocal-search");
  }

  function handleMoveToTracks() {
    navigate("/track-search");
  }

  function handleResetHover() {
    setIsWhatHover("");
  }

  function handleVocalHover() {
    setIsWhatHover("vocals");
  }

  function handleTrackHover() {
    setIsWhatHover("tracks");
  }

  return (
    <>
      <Header homeLogo slogan>
        <LoginButton />
      </Header>
      <MainPageWrapper>
        <Background
          originBackground={originBackground}
          hoverVocalsBackground={hoverVocalsBackground}
          hoverTracksBackground={hoverTracksBackground}
          isWhatHover={isWhatHover}
        />
        <VocalsTextIcon isVocalsHover={isWhatHover === "vocals"} />
        <TracksTextIcon isTracksHover={isWhatHover === "tracks"} />
        <VocalsArea onMouseEnter={handleVocalHover} onMouseLeave={handleResetHover} onClick={handleMoveToVocals} />
        <TracksArea onMouseEnter={handleTrackHover} onMouseLeave={handleResetHover} onClick={handleMoveToTracks} />
        <MainSlogan src={mainSloganImg} alt="슬로건" />
        <Ads />
        <Footer />
      </MainPageWrapper>

      {showModal.isOpen && <ConventionModal />}
    </>
  );
}

const Background = styled.main<{
  originBackground: string;
  hoverVocalsBackground: string;
  hoverTracksBackground: string;
  isWhatHover: string;
}>`
  width: 192rem;
  content: url(${({ isWhatHover, originBackground, hoverTracksBackground, hoverVocalsBackground }) =>
    isWhatHover === "" ? originBackground : isWhatHover === "vocals" ? hoverVocalsBackground : hoverTracksBackground});
`;

const MainPageWrapper = styled.div`
  position: absolute;

  background-color: black;
`;

const VocalsArea = styled.div`
  width: 48rem;
  height: 50rem;

  position: absolute;
  top: 41rem;
  left: 129rem;
  transform: rotate(40deg);
  cursor: pointer;
`;

const VocalsTextIcon = styled(MainVocalsTextIc)<{ isVocalsHover: boolean }>`
  position: absolute;
  top: 77rem;
  left: 151.7rem;

  width: 16rem;

  background-repeat: no-repeat;

  ${({ isVocalsHover }) =>
    isVocalsHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const TracksArea = styled.div`
  width: 50rem;
  height: 47rem;

  position: absolute;

  top: 8rem;
  left: 86.5rem;
  transform: rotate(-50deg);
  border-radius: 2.8rem 0 0;
  cursor: pointer;
`;

const TracksTextIcon = styled(MainTracksTextIc)<{ isTracksHover: boolean }>`
  position: absolute;

  top: 41rem;
  left: 110rem;

  width: 16rem;

  background-repeat: no-repeat;

  ${({ isTracksHover }) =>
    isTracksHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const MainSlogan = styled.img`
  position: absolute;
  top: 50.6rem;
  left: 8.7rem;

  width: 35rem;
`;
