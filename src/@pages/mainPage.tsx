import styled, { css } from "styled-components";
import { useState } from "react";

import { TracksTextIc, VocalsTextIc } from "../assets";
import mainBackgroundImg from "../assets/image/mainBackgroundImg.png";
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
      <VocalsTextIcon state={isVocalsHover} />
      <TracksArea onMouseEnter={setTracksImg} onMouseLeave={setDefaultImg} />
      <TracksTextIcon state={isTracksHover} />
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
  width: 54.8rem;
  height: 57.2rem;

  position: absolute;
  z-index: 99;
  top: 41.2rem;
  left: 120.4rem;
  transform: rotate(40deg);
  cursor: pointer;
`;

const VocalsTextIcon = styled(VocalsTextIc)<{ state: boolean }>`
  width: 21.7rem;
  height: 21.2rem;

  position: absolute;
  top: 81.3rem;
  left: 144.7rem;
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

const TracksArea = styled.div`
  width: 56.4rem;
  height: 53.8rem;

  position: absolute;
  z-index: 99;
  top: 3.2rem;
  left: 72rem;
  transform: rotate(-50deg);
  border-radius: 2.8rem 0 0;
  cursor: pointer;
`;

const TracksTextIcon = styled(TracksTextIc)<{ state: boolean }>`
  width: 18.9rem;
  height: 20.4rem;

  position: absolute;
  top: 42.4rem;
  left: 99.5rem;
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
  top: 90.9rem;
  left: 8.3rem;
`;
