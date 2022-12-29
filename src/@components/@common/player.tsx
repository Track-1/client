import styled from "styled-components";
import ditto from "../../assets/audio/ditto.mp3";
import { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";

export default function Player() {
  const audio = useMemo(() => new Audio(ditto), [ditto]);

  const playBar = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [down, setDown] = useState<boolean>(false);

  const [play, setPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:0');

  const duration=parseInt(String(audio.duration/60))+":"+parseInt(String(audio.duration%60));


  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(parseInt(String(audio.currentTime/60))+":"+parseInt(String(audio.currentTime%60)))
      setProgress((audio.currentTime / audio.duration) * 1000);
    });

}, [audio,play]);

  function playAudio() {
    setPlay((play)=>!play)
  }

    if (play) {
        audio.play();
        audio.addEventListener("timeupdate", () => {
          goProgress();
        });
    
    } else {
        audio.pause();
        audio.removeEventListener("timeupdate", () => {
          goProgress();
        });
    
    }

  function quitAudio() {
    audio.pause();
    audio.currentTime = 0;
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

  return (
    <PlayerContainer>
    <PlayerWrapper>
      <PlayerBarWrapper
        onClick={controlAudio}
        onMouseDown={downMouse}
        onMouseUp={upMouse}
        onMouseMove={moveAudio}
        ref={playBar}>
        <Playbar progress={progress} />
      </PlayerBarWrapper>

      <PlayerInformWrapper>
        <PlayBtn onClick={playAudio}>{!play?("▶️"):("⏸")}</PlayBtn>
        <StopBtn onClick={quitAudio}>stop</StopBtn>
        <p>{currentTime}</p>
        <p>{duration}</p>
      </PlayerInformWrapper>
    </PlayerWrapper>
    </PlayerContainer>
  );
}

const PlayerContainer = styled.section`
  position: fixed;
  z-index: 10;

  display: flex;
  justify-content: flex-end;

  width: 192rem;
  height: 108rem;

`;

const PlayerWrapper=styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

`

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
`;

const PlayBtn = styled.div`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  background-color: white;
`;


const StopBtn = styled.div`
  height: 5rem;
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 1rem;
  background-color: white;
`;

const Playbar = styled.div<{ progress: number }>`
  height: 1rem;
  width: ${(props) => props.progress}%;
  background-color: ${({ theme }) => theme.colors.sub1};
`;

const PlayerBarWrapper = styled.div`
  height: 0.3rem;
  width: 192rem;

  margin-top: 2rem;
  background-color: ${({ theme }) => theme.colors.gray3};
`;

