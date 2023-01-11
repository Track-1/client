import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PauseBtnIc, PortfolioPlayBtnIc, ProducerProfilePauseIc, ProducerProfilePlayIc } from "../../assets";
import { playMusic, showPlayerBar, audioFile } from "../../recoil/player";
import { ProducerPortfolioType } from "../../type/producerProfile";
import PortfoliosInform from "../@common/portfoliosInform";

interface PropsType {
  portfolioData: ProducerPortfolioType[];
  isMe: boolean;
  profileState: string;
  stateChange: boolean;
  audio: HTMLAudioElement;
  playAudio: () => void;
  pauseAudio: () => void;
  duration: number;
  getDuration: (durationTime: number) => void;
}

export default function ProducerPortFolioList(props: PropsType) {
  const { portfolioData, isMe, profileState, stateChange, audio, playAudio, pauseAudio, duration, getDuration } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [currentFile, setCurrentFile] = useRecoilState<string>(audioFile);
  const [beatId, setBeatId] = useState<number>();

  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  function hoverPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function hoverOutPortfolio(id: number) {
    id !== clickedIndex && setHoveredIndex(-1);
  }
  // function clickPauseIc(id: number) {
  //   setPlay(true);
  //   setClickedIndex(id);
  // }

  // function clickPlayIc() {
  //   setPlay(false);
  // }

  useEffect(() => {
    setHoveredIndex(-1);
    setClickedIndex(-1);
    setPlay(false);
  }, [stateChange]);

  useEffect(() => {
    playAudio();
  }, [currentFile]);

  useEffect(() => {
    setCurrentFile(portfolioData[clickedIndex]?.beatWavFile);
    audio.src = portfolioData[clickedIndex]?.beatWavFile;
    getDuration(portfolioData[clickedIndex]?.wavFileLength);

    console.log(clickedIndex);
  }, [clickedIndex]);

  function playAudioOnTrack(id: number) {
    if (clickedIndex === id) {
      audio.play();
      setPlay(true);
    } else {
      setPlay(true);

      setShowPlayer(true);
      setBeatId(id);
      setClickedIndex(id);
    }
  }

  return (
    <>
      <ProfileListContainer>
        {portfolioData.map((portfolio, index) => {
          return (
            <PortfolioBox
              key={portfolio.id}
              isLarge={index === 0 || clickedIndex === index}
              onMouseEnter={() => hoverPortfolio(index)}
              onMouseLeave={() => hoverOutPortfolio(index)}
              index={index}
              profileState={profileState}
              producerPortfolioClickBool={clickedIndex === index}>
              <div>
                {((hoveredIndex === index && clickedIndex !== index && hoveredIndex !== -1) ||
                  (!play && hoveredIndex === index && clickedIndex === index && hoveredIndex !== -1)) && (
                  <ProducerProfilePauseIcon onClick={() => playAudioOnTrack(index)} />
                )}
                {play &&
                  clickedIndex === index &&
                  hoveredIndex === index &&
                  hoveredIndex !== -1 &&
                  clickedIndex !== -1 && <ProducerProfilePlayIcon onClick={pauseAudio} />}

                {hoveredIndex === index && hoveredIndex !== -1 && (
                  <ProducerPorfolioBlur
                    index={index}
                    producerPortfolioClickBool={clickedIndex === index}
                    profileState={profileState}
                  />
                )}

                <PortfolioImage
                  src={portfolio.jacketImage}
                  isLarge={index === 0 || clickedIndex === index}
                  index={index}
                  profileState={profileState}
                  clickBool={clickedIndex === index}
                />
              </div>
              <TitleWrapper>
                {index === 0 && hoveredIndex !== index && clickedIndex !== null && clickedIndex !== index && (
                  <AudioTitle hoverBool={hoveredIndex === index} clickBool={clickedIndex === index}>
                    {portfolio.title}
                  </AudioTitle>
                )}
                {index !== 0 && (
                  <AudioTitle hoverBool={hoveredIndex === index} clickBool={clickedIndex === index}>
                    {portfolio.title}
                  </AudioTitle>
                )}
              </TitleWrapper>
            </PortfolioBox>
          );
        })}
      </ProfileListContainer>
      {portfolioData && (
        <InformWrapper>
          <PortfoliosInform
            isMe={isMe}
            hoverId={hoveredIndex}
            clickId={clickedIndex}
            portfolios={portfolioData}
            profileState={profileState}
          />
        </InformWrapper>
      )}
    </>
  );
}

const TitleWrapper = styled.div`
  width: 14rem;
  height: 5rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const ProducerPorfolioBlur = styled.div<{ index: number; producerPortfolioClickBool: boolean; profileState: string }>`
  position: absolute;
  z-index: 3;

  width: ${({ producerPortfolioClickBool, profileState, index }) =>
    (index === 0 && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  height: ${({ producerPortfolioClickBool, profileState, index }) =>
    (index === 0 && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;

  border-radius: 50%;

  transform: rotate(45deg);

  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`;

const InformWrapper = styled.div`
  margin-left: -77.2rem;
`;

const ProfileListContainer = styled.section`
  width: 47.8rem;

  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: -16rem;
  margin-top: 23.3rem;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioBox = styled.article<{
  isLarge: boolean;
  index: number;
  profileState: string;
  producerPortfolioClickBool: boolean;
}>`
  width: ${({ producerPortfolioClickBool, profileState, index }) =>
    (index === 0 && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  height: ${({ producerPortfolioClickBool, profileState, index }) =>
    (index === 0 && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;

  position: relative;

  border-radius: 50%;

  overflow: hidden;

  margin-top: ${({ index, profileState }) => (index === 0 && profileState !== "Vocal Searching" ? 3 : 4)}rem;
  margin-top: ${({ index, profileState }) => index === 0 && profileState === "Vocal Searching" && 13}rem;
  margin-top: ${({ index, profileState, producerPortfolioClickBool }) =>
    index === 0 && profileState === "Vocal Searching" && producerPortfolioClickBool && 3}rem;

  :hover {
    box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub1};
  }
`;

const PortfolioImage = styled.img<{ isLarge: boolean; index: number; profileState: string; clickBool: boolean }>`
  height: ${({ clickBool, index, profileState }) =>
    (index === 0 && profileState !== "Vocal Searching") || clickBool ? 42 : 21.8}rem;
  width: ${({ clickBool, index, profileState }) =>
    (index === 0 && profileState !== "Vocal Searching") || clickBool ? 42 : 21.8}rem;
`;

const ProducerProfilePauseIcon = styled(ProducerProfilePauseIc)`
  position: absolute;
  z-index: 5;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProducerProfilePlayIcon = styled(ProducerProfilePlayIc)`
  position: absolute;
  z-index: 5;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AudioTitle = styled.h1<{ hoverBool: boolean; clickBool: boolean }>`
  color: ${({ theme }) => theme.colors.gray2};
  display: ${({ hoverBool, clickBool }) => (hoverBool || clickBool) && "none"};

  ${({ theme }) => theme.fonts.id}

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
