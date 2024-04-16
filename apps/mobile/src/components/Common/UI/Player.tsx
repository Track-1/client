import styled from 'styled-components';
import Text from '../Text';
import { CloseIc, PauseIc, PlayIc } from 'src/assets';
import useControlPlayer from 'src/hooks/useControlPlayer';
import { useAudioContext } from 'src/context/audioContext';
import { Z_INDEX } from 'src/constant/style';
import { usePlay } from 'src/hooks/usePlay';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AudioPlayingData, AudioPlayingState } from 'src/recoil/common/audio';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PlayerProps {
  isPlaying: boolean;
  audioTitle?: string;
  userName?: string;
  handlePlay: () => void;
}

export default function Player(props: PlayerProps) {
  const { isPlaying, audioTitle, userName, handlePlay } = props;
  const { audio } = useAudioContext();

  // const { handlePlay } = usePlay(playingAudioData.audioSrc);
  // const [audioPlayingState, setAudioPlayingState] = useRecoilState(AudioPlayingState);

  const playerElement = document.getElementById('player');

  if (!playerElement) return null;

  return createPortal(
    <PlayerContainer>
      <PlayerWrapper>
        <ProgressBar audio={audio} isPlaying={isPlaying} />

        <PlayerInfoWrapper>
          <TrackInfoWrapper>
            <Text as="span" font="Pre_16_M" color="white">
              {audioTitle}
              {/* {audioPlayingData.audioTitle} */}
            </Text>
            <Text as="span" font="Pre_16_M" color="white">
              {userName}
              {/* {audioPlayingData.userName} */}
            </Text>
          </TrackInfoWrapper>

          <IconTimeWrapper>
            <ProgressTime audio={audio} isPlaying={isPlaying} />
            <div onClick={handlePlay}>{isPlaying ? <PauseIc /> : <PlayIc />}</div>
          </IconTimeWrapper>
        </PlayerInfoWrapper>
      </PlayerWrapper>
    </PlayerContainer>,
    playerElement
  );
}

interface ProgressStateProps {
  audio: HTMLAudioElement;
  isPlaying: boolean;
}

function ProgressBar(props: ProgressStateProps) {
  const { audio, isPlaying } = props;
  const {
    progress,
    isPlaybarHovered,
    playBar,
    controlAudio,
    downMouse,
    upMouse,
    moveAudio,
    hoverPlaybar,
    detachPlyabar,
  } = useControlPlayer(audio, isPlaying);

  return (
    <>
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
    </>
  );
}

function ProgressTime(props: ProgressStateProps) {
  const { audio, isPlaying } = props;
  const { currentTimeText, totalTimetext } = useControlPlayer(audio, isPlaying);

  return (
    <TimeWrapper>
      <Text as="p" font="Pre_14_R" color="white">
        {currentTimeText}
      </Text>
      <Text as="p" font="Pre_14_R" color="gray3">
        {totalTimetext}
      </Text>
    </TimeWrapper>
  );
}

const PlayerContainer = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;

  display: flex;
  align-items: center;

  width: 100%;
  height: 10.5rem;
  z-index: ${Z_INDEX.PLAYER};
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

const CloseIcon = styled(CloseIc)`
  position: fixed;
  right: 2rem;
  bottom: 7rem;
`;
