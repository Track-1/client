import { useContext, useEffect } from 'react';
import styled from 'styled-components';
// import { PlayerPlayIc, PlayerQuitIc, PlayerStopIc } from '../../assets';
// import { PlayerContext } from "../../context/playerContext";
// import useControlPlayer from "../../hooks/common/useControlPlayer";
import { PlayerContext } from '../../../context/playerContext';
import useControlPlayer from '../../../hooks/common/useControlPlayer';

const PlayerContainer = styled.section`
  position: fixed;
  bottom: 0;
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

  position: relative;
`;

const PlayerInformWrapper = styled.div`
  width: 192rem;
  height: 11rem;

  display: flex;
  align-items: center;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
  position: relative;
`;

const Playbar = styled.div<{ progress: number; isActive: boolean }>`
  width: ${(props) => props.progress}%;
  height: 3rem;

  background-color: transparent;

  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid ${({ theme }) => theme.colors.neon_green};

  pointer-events: auto;
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

  display: ${({ isActive }) => !isActive && 'none'};
`;

const PlayerBarWrapper = styled.div<{ isActive: boolean }>`
  width: 192rem;
  height: 3rem;

  background-color: transparent;
  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid ${({ theme }) => theme.colors.gray3};
  pointer-events: auto;
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

  ${({ theme }) => theme.fonts.Alex_10_B};
  color: ${({ whiteText, theme }) => (whiteText ? theme.colors.white : theme.colors.gray2)};
  pointer-events: auto;
`;

const PlayerTitleText = styled.div`
  width: 74rem;

  ${({ theme }) => theme.fonts.Alex_10_B};
  color: ${({ theme }) => theme.colors.white};
  pointer-events: auto;
`;

const PlayerNameText = styled.div`
  width: 16rem;

  ${({ theme }) => theme.fonts.Alex_10_B};
  color: ${({ theme }) => theme.colors.gray2};
  pointer-events: auto;

  margin-right: 2rem;
`;

// const PauseIcon = styled(PlayerStopIc)`
//   height: 2.4rem;
//   margin-right: 5.1rem;
//   pointer-events: auto;
// `;

// const PlayIcon = styled(PlayerPlayIc)`
//   height: 2.4rem;
//   margin-right: 5.1rem;
//   pointer-events: auto;
// `;

// const QuitIcon = styled(PlayerQuitIc)`
//   width: 3.5rem;
//   height: 3.5rem;

//   pointer-events: auto;
// `;

interface PlayerProps {
  comment?: boolean;
}

export default function Player({ comment }: PlayerProps) {
  const {
    playAudio,
    stopAudio,
    quitAudio,
    closeAudioPlayer,
    playContextState,
    stopContextState,
    showPlayer,
    contextPlaying,
    audio,
    playerInfo,
  } = useContext(PlayerContext);

  const {
    progress,
    isPlaybarHovered,
    playBar,
    currentTimeText,
    totalTimetext,
    controlAudio,
    downMouse,
    upMouse,
    moveAudio,
    hoverPlaybar,
    detachPlyabar,
  } = useControlPlayer(audio, contextPlaying);

  window.addEventListener('popstate', quit);

  function play() {
    playContextState();
    playAudio();
  }

  function pause() {
    stopContextState();
    stopAudio();
  }

  function quit() {
    quitAudio();
    closeAudioPlayer();
  }

  useEffect(() => {
    if (currentTimeText === totalTimetext) {
      stopContextState();
    }
  }, [currentTimeText]);

  return showPlayer ? (
    <PlayerContainer>
      <PlayerWrapper>
        <Pointer progress={progress} isActive={isPlaybarHovered}></Pointer>
        <PlayerBarWrapper
          ref={playBar}
          onClick={controlAudio}
          onMouseDown={downMouse}
          onMouseUp={upMouse}
          onMouseMove={moveAudio}
          onMouseOver={hoverPlaybar}
          onMouseLeave={detachPlyabar}
          isActive={isPlaybarHovered}>
          <Playbar progress={progress} isActive={isPlaybarHovered} />
        </PlayerBarWrapper>

        <PlayerInformWrapper>
          <ThumbnailWrapper>
            <Thumbnail src={playerInfo?.imageFile} alt="썸네일 이미지" />
          </ThumbnailWrapper>
          <PlayerTitleText>{playerInfo?.title}</PlayerTitleText>
          <PlayerNameText>{playerInfo?.userName}</PlayerNameText>
          {/* {contextPlaying ? <PauseIcon onClick={pause} /> : <PlayIcon onClick={play} />} */}
          <PlayerInformText width={10} whiteText={true}>
            {currentTimeText}
          </PlayerInformText>
          <PlayerInformText width={30} whiteText={false}>
            {totalTimetext}
          </PlayerInformText>
          {/* <QuitIcon onClick={quit} /> */}
        </PlayerInformWrapper>
      </PlayerWrapper>
    </PlayerContainer>
  ) : null;
}
