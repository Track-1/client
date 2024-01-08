import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../../../context/playerContext';
import useControlPlayer from '../../../hooks/common/useControlPlayer';
import Text from '../Text';
import { ImageWrapper } from '../Interface';
import { PauseIc, PlayIc } from '../../../assets';
import usePaly from '../../../hooks/common/usePlay';

const PlayerContainer = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 10.5rem;
`;

const PlayerWrapper = styled.article`
  display: flex;
  flex-direction: column;

  width: 100%;

  cursor: pointer;

  position: relative;
`;

const PlayerInfoWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 10rem;

  display: flex;
  align-items: center;

  padding: 2.5rem;

  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(5px);
`;

const Playbar = styled.div<{ progress: number; isActive: boolean }>`
  width: ${(props) => props.progress}%;
  height: 0.5rem;

  background-color: transparent;

  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid ${({ theme }) => theme.colors.neon_purple};

  pointer-events: auto;
`;

const Pointer = styled.div<{ progress: number; isActive: boolean }>`
  width: 1.3rem;
  height: 1.3rem;

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
  width: 100%;
  height: 0.5rem;

  background-color: transparent;
  border-bottom: ${({ isActive }) => (isActive ? 0.7 : 0.3)}rem solid ${({ theme }) => theme.colors.gray3};
  pointer-events: auto;
`;

const IconTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 16.2rem;
  height: 100%;
`;

const TrackInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 16.2rem);
  height: 100%;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const TimeWrapper = styled.div`
  display: flex;
  gap: 1.9rem;
`;

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
    isAudioPlaying,
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

        <PlayerInfoWrapper>
          <TrackInfoWrapper>
            <Text as="span" font="Pre_16_M" color="white">
              {playerInfo?.title}
            </Text>
            <Text as="span" font="Pre_16_M" color="white">
              {playerInfo?.userName}
            </Text>
          </TrackInfoWrapper>

          <IconTimeWrapper>
            <TimeWrapper>
              <Text as="p" font="Pre_14_R" color="white">
                {currentTimeText}
              </Text>
              <Text as="p" font="Pre_14_R" color="gray3">
                {totalTimetext}
              </Text>
            </TimeWrapper>

            <ImageWrapper as="button" width={3} height={3} onClick={isAudioPlaying() ? pause : play}>
              {isAudioPlaying() ? <PauseIc /> : <PlayIc />}
            </ImageWrapper>
          </IconTimeWrapper>
        </PlayerInfoWrapper>
      </PlayerWrapper>
    </PlayerContainer>
  ) : null;
}
