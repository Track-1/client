import styled from "styled-components";
import ditto from "../../assets/audio/ditto.mp3";
import { useState, useMemo, useRef, useLayoutEffect, useEffect } from "react";
import thumbnailImg from '../../assets/image/thumbnailImg.png'
import { PauseIc, PlayIc, QuitIc } from "../../assets";
import {showPlayerBar, playMusic} from "../../recoil/player"
import { useRecoilState } from "recoil";


export default function Player() {
  const audio = useMemo(() => new Audio(ditto), [ditto]);

  const playBar = useRef<HTMLDivElement>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [down, setDown] = useState<boolean>(false);

  const [play, setPlay] = useRecoilState<boolean>(playMusic)
  const [currentTime, setCurrentTime] = useState<string>('0:0');

  const title="Sweet (feat. 구슬한 of 보수동쿨러)"
  const producer="해서웨이(hathaw9y)"
  const duration=parseInt(String(audio.duration/60))+":"+parseInt(String(audio.duration%60));

  const [showPlayer, setShowPlayer]=useRecoilState<boolean>(showPlayerBar)

  useLayoutEffect(() => {
    playBar.current && setBarWidth(playBar.current.offsetWidth);
  });

  useEffect(() => {
    if (play) {
      audio.play();
    } else {
        audio.pause();
    }
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(parseInt(String(audio.currentTime/60))+":"+parseInt(String(audio.currentTime%60)))
      setProgress((audio.currentTime / audio.duration) * 1000);
      goProgress();
    });

}, [audio,play]);

  function playAudio() {
    setPlay((play)=>!play)
  }

  function quitAudio() {
    audio.pause();
    audio.currentTime = 0;

    setShowPlayer(false)
    setPlay(false)
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
        <Thumbnail src={thumbnailImg} alt="썸네일 이미지"/>
        <PlayerInformText width={74} color={"white"}>{title}</PlayerInformText>
        <PlayerInformText width={16} color={"gray2"}>{producer}</PlayerInformText>
        {play?(<PlayIcon onClick={playAudio}/>):(<PauseIcon onClick={playAudio}/>)} 
        <PlayerInformText width={10} color={"white"}>{currentTime}</PlayerInformText>
        <PlayerInformText width={30} color={"gray2"}>{duration}</PlayerInformText>
        <QuitIcon onClick={quitAudio}/>

      </PlayerInformWrapper>
    </PlayerWrapper>
    </PlayerContainer>
  );
}

const PlayerContainer = styled.section`
  position: fixed;
  z-index: 10;
  pointer-events: none; 

  display: flex;

  width: 192rem;
  height: 108rem;

`;

const PlayerWrapper=styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  cursor: pointer;

`

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
`;

const Playbar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 3rem;

  background-color: transparent;
  border-bottom: 0.3rem solid ${({ theme }) => theme.colors.sub1};
  pointer-events: auto; 
`;

const PlayerBarWrapper = styled.div`
  width: 192rem;
  height: 3rem;

  margin-top: 2rem;

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
`

const PlayerInformText=styled.div<{width:number, color:string}>`
    width: ${({width})=>width}rem;

    ${({ theme }) => theme.fonts.player_title};
    color: ${({ color }) => color==="white"?("white"):("gray")};
    pointer-events: auto; 

`

const PauseIcon=styled(PauseIc)`
    margin-right: 5.1rem;
    pointer-events: auto; 

`

const PlayIcon=styled(PlayIc)`
    margin-right: 5.1rem;
    pointer-events: auto; 

`

const QuitIcon=styled(QuitIc)`
    pointer-events: auto; 
`