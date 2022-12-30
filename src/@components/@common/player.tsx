import styled from "styled-components";
import ditto from "../../assets/audio/ditto.mp3";
import { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import thumbnailImg from '../../assets/image/thumbnailImg.png'
import { PauseIc, PlayIc, QuitIc } from "../../assets";

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
      goProgress();
    });

}, [audio,play]);

  function playAudio() {
    setPlay((play)=>!play)
  }

  if (play) {
      audio.play();    
  } else {
      audio.pause();
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
        // onMouseDown={downMouse}
        // onMouseUp={upMouse}
        // onMouseMove={moveAudio}
        ref={playBar}>
        <Playbar progress={progress} />
      </PlayerBarWrapper>

      <PlayerInformWrapper>
        <Thumbnail src={thumbnailImg} alt="썸네일 이미지"/>
        <PlayerInformText width={74} color={"white"}>Favorite</PlayerInformText>
        <PlayerInformText width={16} color={"gray2"}>Nct127</PlayerInformText>
        {play?(<PlayIcon onClick={playAudio}/>):(<PauseIcon onClick={playAudio}/>)} 
        <PlayerInformText width={10} color={"white"}>{currentTime}</PlayerInformText>
        <PlayerInformText width={30} color={"gray2"}>3:11</PlayerInformText>
        <QuitIc onClick={quitAudio}/>

      </PlayerInformWrapper>
    </PlayerWrapper>
    </PlayerContainer>
  );
}

const PlayerContainer = styled.section`
  position: fixed;
  z-index: 10;

  display: flex;

  width: 192rem;
  height: 108rem;

`;

const PlayerWrapper=styled.article`
  display: flex;
  flex-direction: column;
  /* justify-content: flex-end; */

`

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  /* justify-content: center; */
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
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

const Thumbnail = styled.img`
    width: 6.5rem;
    height: 6.5rem;

    margin-left: 34rem;
    margin-right: 3.069rem;

    border-radius: 5rem;
`

const PlayerInformText=styled.div<{width:number, color:string}>`
    width: ${({width})=>width}rem;

    ${({ theme }) => theme.fonts.player_title};
    color: ${({ color }) => color==="white"?("white"):("gray")};

    /* color: ${({ color, theme }) => theme.colors+'.'+color}; */
`

const PauseIcon=styled(PauseIc)`
    margin-right: 5.1rem;
`

const PlayIcon=styled(PlayIc)`
    margin-right: 5.1rem;
`