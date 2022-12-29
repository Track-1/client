import styled, { keyframes, css } from "styled-components";
import { useState } from "react";

import mainBackgroundImg from "../assets/image/mainBackgroundImg.png";
import tracksTextImg from "../assets/image/tracksTextImg.svg";
import vocalsTextImg from "../assets/image/vocalsTextImg.svg";
import hoverVocalsImg from "../assets/image/hoverVocalsImg.png";
import hoverTracksImg from "../assets/image/hoverTracksImg.png";
import mainSloganImg from "../assets/image/mainSloganImg.png";

export default function MainPage() {
  const [background, setBackground] = useState<string>(mainBackgroundImg);
  const [isTracksHover, setIsTracksHover] = useState<boolean>(false);
  const [isVocalsHover, setIsVocalsHover] = useState<boolean>(false);

  function setVocalsImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground((prev) => hoverVocalsImg);
    setIsVocalsHover((prev) => !prev);
  }

  function setTracksImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground((prev) => hoverTracksImg);
    setIsTracksHover((prev) => !prev);
  }

  function setDefaultImg(e: React.MouseEvent<HTMLDivElement>) {
    setBackground((prev) => mainBackgroundImg);

    if (isTracksHover) {
      setIsTracksHover((prev) => !prev);
    } else {
      setIsVocalsHover((prev) => !prev);
    }
  }

  return (
    <MainBackground background={background}>
      <VocalsArea onMouseEnter={setVocalsImg} onMouseLeave={setDefaultImg} />
      <VocalsText state={isVocalsHover} onMouseEnter={setVocalsImg} onMouseLeave={setDefaultImg} />
      <TracksArea onMouseEnter={setTracksImg} onMouseLeave={setDefaultImg} />
      <TracksText state={isTracksHover} onMouseEnter={setTracksImg} onMouseLeave={setDefaultImg} />
      <MainSlogan src={mainSloganImg} alt="슬로건" />
    </MainBackground>
  );
}

const MainBackground = styled.main<{ background: string }>`
  width: 100%;
  height: 100vh;

  position: relative;
  background-image: url(${({ background }) => background});
  background-repeat: no-repeat;
`;

const VocalsArea = styled.div`
  width: 34.25rem;
  height: 35.75rem;

  position: absolute;
  z-index: 99;
  top: 25.75rem;
  left: 75.25rem;
  transform: rotate(40deg);
  cursor: pointer;
`;

const TracksArea = styled.div`
  width: 35.25rem;
  height: 33.625rem;

  position: absolute;
  z-index: 99;
  top: 2rem;
  left: 45rem;
  transform: rotate(-50deg);
  border-radius: 1.75rem 0 0;
  cursor: pointer;
`;

const TracksText = styled.div<{ state: boolean }>`
  width: 11.8125rem;
  height: 12.75rem;

  position: absolute;
  top: 26.5rem;
  left: 62.1875rem;
  background-image: url(${tracksTextImg});
  background-repeat: no-repeat;

  ${(props) =>
    props.state &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const VocalsText = styled.div<{ state: boolean }>`
  width: 13.5625rem;
  height: 13.25rem;

  position: absolute;
  top: 50.8125rem;
  left: 90.4375rem;
  background-image: url(${vocalsTextImg});
  background-repeat: no-repeat;

  ${(props) =>
    props.state &&
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
  top: 56.8125rem;
  left: 5.1875rem;
`;
