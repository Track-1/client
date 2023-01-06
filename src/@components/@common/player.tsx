import styled from "styled-components";
import ditto from "../../assets/audio/ditto.mp3";
import { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import jacketImage from "../../assets/image/thumbnailImg.png";
import { PauseIc, PlayIc, QuitIc } from "../../assets";
import { showPlayerBar, playMusic, trackClicked, selectedId } from "../../recoil/player";
import { useRecoilState, useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck";
import axios from "axios";

export default function Player() {
  const playBar = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [down, setDown] = useState<boolean>(false);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [currentTime, setCurrentTime] = useState<string>("0:0");

  const [id, setId] = useRecoilState<number>(selectedId);
  const [trackClick, setTrakClick] = useRecoilState<number>(trackClicked);
  const [audioSrc, setAudioSrc] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [producerName, setProducerName] = useState<string>();
  const [durationSecond, setDurationSecond] = useState<number>();

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const tracksOrVocals = useRecoilValue(tracksOrVocalsCheck);

  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  const audio = useMemo(() => new Audio(audioSrc), [audioSrc]);
  const duration = parseInt(String(audio.duration / 60)) + ":" + parseInt(String(audio.duration % 60));

  useEffect(() => {
    getPlayerData();
    setAudioSrc(ditto);
    setTitle("Sweet (feat. 구슬한 of 보수동쿨러)");
    setProducerName("해서웨이(hathaw9y)");
    setDurationSecond(310);

    if (play) {
      audio.play();
    } else {
      audio.pause();
    }

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(parseInt(String(audio.currentTime / 60)) + ":" + parseInt(String(audio.currentTime % 60)));
      setProgress((audio.currentTime / audio.duration) * 1000);
      goProgress();
    });

    window.addEventListener("keypress", (e: any) => {
      if (e.keyCode === 32) {
        e.preventDefault();
        if (audio.paused) {
          setPlay(true);
          audio.play();
        } else {
          setPlay(false);
          audio.pause();
        }
        if (audio.currentTime === audio.duration) {
          audio.play();
          audio.currentTime = 0;
          setPlay(true);
        }
      }
    });
  }, [audio, play, window]);

  async function getPlayerData() {
    try {
      const response = await axios.get(`${id}`);
      setAudioSrc(ditto);
      setTitle("Sweet (feat. 구슬한 of 보수동쿨러)");
      setProducerName("해서웨이(hathaw9y)");
      setDurationSecond(310);
    } catch (error) {
      console.log(error);
    }
  }

  function playAudio() {
    setPlay((play) => !play);
    if (audio.currentTime === audio.duration) {
      audio.play();
      audio.currentTime = 0;
      setPlay(true);
    }
  }

  function quitAudio() {
    audio.pause();
    audio.currentTime = 0;

    setShowPlayer(false);
    setPlay((play) => !play);
    setId(-1);
    setTrakClick(-1);
  }

  function goProgress() {
    const currentDuration = (audio.currentTime / audio.duration) * 100;

    setProgress(currentDuration);
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

  function moveAudio(e: React.MouseEvent<HTMLDivElement>) {
    if (down) {
      const mousePoint = Math.round((e.nativeEvent.offsetX / barWidth) * 100);
      const currentStop = (audio.duration * mousePoint) / 100;
      audio.currentTime = currentStop;
    }
  }

  if (audio.currentTime === audio.duration) {
    audio.pause();
    audio.currentTime = 1000;
    setPlay(false);
  }

  return (
    <PlayerContainer>
      <PlayerWrapper>
        <PlayerBarWrapper
          onClick={controlAudio}
          onMouseDown={downMouse}
          onMouseUp={upMouse}
          onMouseMove={moveAudio}
          ref={playBar}>
          <Playbar progress={progress} tracksOrVocals={tracksOrVocals} />
        </PlayerBarWrapper>

        <PlayerInformWrapper>
          <Thumbnail src={jacketImage} alt="썸네일 이미지" />
          <PlayerInformText width={74} whiteText={true}>
            {title}
          </PlayerInformText>
          <PlayerInformText width={16} whiteText={false}>
            {producerName}
          </PlayerInformText>
          {play ? <PlayIcon onClick={playAudio} /> : <PauseIcon onClick={playAudio} />}
          <PlayerInformText width={10} whiteText={true}>
            {currentTime}
          </PlayerInformText>
          <PlayerInformText width={30} whiteText={false}>
            {duration}
          </PlayerInformText>
          <QuitIcon onClick={quitAudio} />
        </PlayerInformWrapper>
      </PlayerWrapper>
    </PlayerContainer>
  );
}

const PlayerContainer = styled.section`
  position: sticky;
  bottom: 0;
  z-index: 10;
  pointer-events: none;

  display: flex;

  width: 192rem;
  height: 108rem;
`;

const PlayerWrapper = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  cursor: pointer;
`;

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
`;

const Playbar = styled.div<{ progress: number; tracksOrVocals: string }>`
  width: ${(props) => props.progress}%;
  height: 3rem;

  background-color: transparent;
  border-bottom: 0.3rem solid
    ${({ tracksOrVocals, theme }) => (tracksOrVocals === "Tracks" ? theme.colors.sub1 : theme.colors.sub2)};
  pointer-events: auto;
`;

const PlayerBarWrapper = styled.div`
  width: 192rem;
  height: 3rem;

  background-color: transparent;
  border-bottom: 0.3rem solid ${({ theme }) => theme.colors.gray3};
  pointer-events: auto;
`;

const Thumbnail = styled.img`
  width: 6.5rem;
  height: 6.5rem;

  margin-left: 34rem;
  margin-right: 3.069rem;

  border-radius: 5rem;
`;

const PlayerInformText = styled.div<{ width: number; whiteText: boolean }>`
  width: ${({ width }) => width}rem;

  ${({ theme }) => theme.fonts.player_title};
  color: ${({ whiteText, theme }) => (whiteText ? theme.colors.white : theme.colors.gray2)};
  pointer-events: auto;
`;

const PauseIcon = styled(PauseIc)`
  margin-right: 5.1rem;
  pointer-events: auto;
`;

const PlayIcon = styled(PlayIc)`
  margin-right: 5.1rem;
  pointer-events: auto;
`;

const QuitIcon = styled(QuitIc)`
  pointer-events: auto;
`;
