import styled from "styled-components";

import { useState, useLayoutEffect, useRef } from "react";
import { PauseIc, PlayIc, QuitIc } from "../../assets";
import { showPlayerBar } from "../../recoil/player";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import { useRecoilState, useRecoilValue } from "recoil";

interface PropsType {
  audio: HTMLAudioElement;
  playAudio: () => void;
  pauseAudio: () => void;
  progress: number;
  duration: number;
  title: string;
  name: string;
  image: string;
  play: any;
  setPlay: any;
}

export default function Player(props: any) {
  const { audio, playAudio, pauseAudio, progress, play, setPlay, audioInfos } = props;
  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);

  const playBar = useRef<HTMLDivElement>(null);

  const [barWidth, setBarWidth] = useState<number>(0);
  const [down, setDown] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  function createTimeText(time: number) {
    const currentSecond = Math.round(time);
    const minute =
      parseInt(String(currentSecond / 60)) < 10
        ? `0${parseInt(String(currentSecond / 60))}`
        : `${parseInt(String(currentSecond / 60))}`;

    const second = currentSecond % 60 < 10 ? `0${currentSecond % 60}` : `${currentSecond % 60}`;
    return minute + ":" + second;
  }

  function quitAudio() {
    audio.pause();
    audio.currentTime = 0;

    setPlay(false);
    setShowPlayer(false);
  }

  function controlAudio(e: React.MouseEvent<HTMLDivElement>) {
    const barPercent = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
    const currentStop = (audio.duration * barPercent) / 100;
    audio.currentTime = currentStop;
  }

  function downMouse() {
    setDown(true);
  }

  function upMouse() {
    setDown(false);
  }

  function hoverPlaybar() {
    setIsHovered(true);
  }

  function detachPlyabar() {
    setDown(false);
    setIsHovered(false);
  }

  function moveAudio(e: React.MouseEvent<HTMLDivElement>) {
    if (down) {
      const mousePoint = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
      const currentStop = (audio.duration * mousePoint) / 100;
      audio.currentTime = currentStop;
    }
  }

  return (
    <PlayerContainer>
      <PlayerWrapper>
        <Pointer progress={progress} isActive={isHovered}></Pointer>
        <PlayerBarWrapper
          ref={playBar}
          onClick={controlAudio}
          onMouseDown={downMouse}
          onMouseUp={upMouse}
          onMouseMove={moveAudio}
          onMouseOver={hoverPlaybar}
          onMouseLeave={detachPlyabar}
          isActive={isHovered}>
          <Playbar progress={progress} tracksOrVocals={tracksOrVocals} isActive={isHovered} />
        </PlayerBarWrapper>

        <PlayerInformWrapper>
          <ThumbnailWrapper>
            <Thumbnail src={audioInfos.image} alt="썸네일 이미지" />
          </ThumbnailWrapper>
          <PlayerTitleText>{audioInfos.title}</PlayerTitleText>
          <PlayerNameText>{audioInfos.name}</PlayerNameText>
          {play ? <PlayIcon onClick={pauseAudio} /> : <PauseIcon onClick={playAudio} />}
          <PlayerInformText width={10} whiteText={true}>
            {createTimeText(Math.round(audio.currentTime))}
          </PlayerInformText>
          <PlayerInformText width={30} whiteText={false}>
            {createTimeText(Math.round(audioInfos.duration))}
          </PlayerInformText>
          <QuitIcon onClick={quitAudio} />
        </PlayerInformWrapper>
      </PlayerWrapper>
    </PlayerContainer>
  );
}

const PlayerContainer = styled.section`
  position: fixed;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;

  display: flex;

  width: 192rem;
  height: 11rem;
`;

const PlayerWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  cursor: pointer;
  z-index: 1000;

  position: relative;
`;

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  z-index: 1000;
  position: relative;
`;

const Playbar = styled.div<{ progress: number; tracksOrVocals: string; isActive: boolean }>`
  width: ${(props) => props.progress}%;
  height: 3rem;

  background-color: transparent;

  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid
    ${({ tracksOrVocals, theme }) => (tracksOrVocals === "Tracks" ? theme.colors.sub1 : theme.colors.sub2)};

  pointer-events: auto;
  z-index: 1000;
`;

const Pointer = styled.div<{ progress: number; isActive: boolean }>`
  width: 2.3rem;
  height: 2.3rem;

  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0.4rem 1rem rgba(0, 0, 0, 0.25);
  border-radius: 50%;

  position: absolute;
  top: 1.6rem;
  left: ${({ progress }) => progress - 0.5}%;
  z-index: 1001;

  pointer-events: none;

  display: ${({ isActive }) => !isActive && "none"};
`;

const PlayerBarWrapper = styled.div<{ isActive: boolean }>`
  width: 192rem;
  height: 3rem;

  background-color: transparent;
  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid ${({ theme }) => theme.colors.gray3};
  pointer-events: auto;
  z-index: 1000;
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 5.7rem;
  height: 5.7rem;
  margin-left: 34rem;
  margin-right: 3.069rem;

  border-radius: 5rem;

  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const PlayerInformText = styled.div<{ width: number; whiteText: boolean }>`
  width: ${({ width }) => width}rem;

  ${({ theme }) => theme.fonts.player_title};
  color: ${({ whiteText, theme }) => (whiteText ? theme.colors.white : theme.colors.gray2)};
  pointer-events: auto;
  z-index: 1000;
`;

const PlayerTitleText = styled.div`
  width: 74rem;

  ${({ theme }) => theme.fonts.player_title};
  color: ${({ theme }) => theme.colors.white};
  pointer-events: auto;
  z-index: 1000;
`;

const PlayerNameText = styled.div`
  width: 16rem;

  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.gray2};
  pointer-events: auto;
  z-index: 1000;

  margin-right: 2rem;
`;

const PauseIcon = styled(PauseIc)`
  height: 2.4rem;
  margin-right: 5.1rem;
  pointer-events: auto;
  z-index: 1000;
`;

const PlayIcon = styled(PlayIc)`
  height: 2.4rem;
  margin-right: 5.1rem;
  pointer-events: auto;
  z-index: 1000;
`;

const QuitIcon = styled(QuitIc)`
  height: 1.5rem;
  pointer-events: auto;
  z-index: 1000;
`;
