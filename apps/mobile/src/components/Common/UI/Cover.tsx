import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { SyntheticEvent } from 'react';
import Player from './Player';
import { PauseIc, PlayIc } from 'src/assets';
import { useAudioContext } from 'src/context/audioContext';
import { usePlay } from 'src/hooks/usePlay';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AudioPlayingData, AudioPlayingState } from 'src/recoil/common/audio';

export type CoverShapeTypes = 'circle' | 'squre';
export type CoverSizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconPositionTypes = 'center' | 'middleLeft' | 'middleRight' | 'centerTop' | 'centerBottom' | 'rightBottom';

export interface CoverFrameProps {
  imageSrc: string;
  imageAlt: string;
  coverSize: CoverSizeTypes;
  coverShape: CoverShapeTypes;
}

export function CoverFrame(props: PropsWithChildren<CoverFrameProps>) {
  const { imageSrc, imageAlt, coverSize, coverShape, children } = props;
  return (
    <StyledCoverContainer coverSize={coverSize} coverShape={coverShape}>
      {children}
      <StyledCoverImage src={imageSrc} alt={imageAlt} onError={handleErrorImage} />
    </StyledCoverContainer>
  );
}

export interface MusicCoverProps extends CoverFrameProps {
  audioSrc: string;
  audioTitle: string;
  userName: string;
  iconPosition: IconPositionTypes;
}

export function MusicCover(props: PropsWithChildren<MusicCoverProps>) {
  const { imageSrc, imageAlt, coverSize, coverShape, audioSrc, audioTitle, userName, iconPosition } = props;

  // const { isPlaying, handlePlay } = usePlay(audioSrc);

  const [isPlaying, setIsPlaying] = useState(false);
  const { audio, playingAudioSrc, changePlayingAudioSrc, playingAudioData, setPlayingAudioData } = useAudioContext();

  const [audioPlayingState, setAudioPlayingState] = useRecoilState(AudioPlayingState);

  useEffect(() => {
    if (audioSrc !== playingAudioSrc) {
      setIsPlaying(false);
    }
  }, [playingAudioSrc]);

  function playAudio() {
    audio.play();
    setIsPlaying(true);
  }

  function pauseAudio() {
    audio.pause();
    setIsPlaying(false);
  }

  function handlePlay() {
    if (playingAudioSrc !== audioSrc) {
      changePlayingAudioSrc(audioSrc);
      audio.src = audioSrc;
    }

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  return (
    <>
      <CoverFrame imageSrc={imageSrc} imageAlt={imageAlt} coverSize={coverSize} coverShape={coverShape}>
        <div
          onClick={() => {
            handlePlay();
          }}>
          {playingAudioSrc === audioSrc && isPlaying ? (
            <PauseIcon iconPosition={iconPosition} />
          ) : (
            <PlayIcon iconPosition={iconPosition} />
          )}
        </div>
      </CoverFrame>
    </>
  );
}

interface AudioCoverProps {
  iconType?: boolean;
  audioSrc: string;
  audioTitle: string;
  userName: string;
  iconPosition?: IconPositionTypes;
}

export function AudioCover(props: PropsWithChildren<AudioCoverProps>) {
  const { audioSrc, audioTitle, userName, iconType, iconPosition, children } = props;

  const { isPlaying, handlePlay, showPlayer } = usePlay(audioSrc);
  const [audioPlayingData, setAudioPlayingData] = useRecoilState(AudioPlayingData);

  return (
    <>
      <AudioCoverContainer onClick={handlePlay}>
        {iconType ? (
          <>{isPlaying ? <PauseIcon /> : <PlayIcon />}</>
        ) : (
          <>
            {children}
            {isPlaying ? <PauseIcon iconPosition={iconPosition} /> : <PlayIcon iconPosition={iconPosition} />}
          </>
        )}
        {}
      </AudioCoverContainer>

      {showPlayer && (
        <Player isPlaying={isPlaying} audioTitle={audioTitle} userName={userName} handlePlay={handlePlay} />
      )}
    </>
  );
}

const AudioCoverContainer = styled.div`
  position: relative;
`;

const StyledCoverContainer = styled.div<{ coverSize: CoverSizeTypes; coverShape: CoverShapeTypes }>`
  position: relative;

  ${({ coverSize }) => getStyleCoverSize(coverSize)}
  ${({ coverShape }) => getStyleCoverShape(coverShape)}

  overflow: hidden;
`;

const StyledCoverImage = styled.img`
  width: 100%;
  height: 100%;
`;

const PlayIcon = styled(PlayIc)<{ iconPosition?: IconPositionTypes }>`
  ${({ iconPosition }) => iconPosition && getStyleIconPosition(iconPosition)}
`;

const PauseIcon = styled(PauseIc)<{ iconPosition?: IconPositionTypes }>`
  ${({ iconPosition }) => iconPosition && getStyleIconPosition(iconPosition)}
`;

function getStyleCoverShape(shape: CoverShapeTypes) {
  let radius;
  let ratio;

  switch (shape) {
    case 'circle':
      radius = '50%';
      ratio = '1/1';
      break;
    case 'squre':
      ratio = '1/1';
      break;
    default:
      break;
  }

  return css`
    border-radius: ${radius};
    aspect-ratio: ${ratio};
  `;
}

function getStyleCoverSize(size: CoverSizeTypes) {
  let width;
  switch (size) {
    case 'xs':
      width = '2rem';
      break;
    case 'sm':
      width = '4rem';
      break;
    case 'md':
      width = '12rem';
      break;
    case 'lg':
      width = '16rem';
      break;
    case 'xl':
      width = '22rem';
      break;
    case 'xxl':
      width = '30rem';
      break;

    default:
      break;
  }

  return css`
    width: ${width};
  `;
}

function getStyleIconPosition(position: IconPositionTypes) {
  let top, left, right, bottom, transform;
  switch (position) {
    case 'center':
      [top, left] = ['50%', '50%'];
      transform = 'translate(-50%, -50%)';
      break;
    case 'rightBottom':
      [bottom, right] = [0, 0];
      break;
    default:
      break;
  }

  return css`
    position: absolute;
    top: ${top};
    left: ${left};
    right: ${right};
    bottom: ${bottom};
    transform: ${transform};
  `;
}

function getStylePlayIconSize(size: CoverSizeTypes) {
  let width;

  switch (size) {
    case 'xs':
      width = '2.4rem';
      break;
    case 'sm':
      width = '2.4rem';
      break;
    case 'md':
      width = '3rem';
      break;
    case 'lg':
      width = '3rem';
      break;
    case 'xl':
      width = '3.6rem';
      break;
    case 'xxl':
      width = '5rem';
      break;

    default:
      break;
  }

  return css`
    width: ${width};
  `;
}

export function handleErrorImage(e: SyntheticEvent<HTMLImageElement, Event>) {
  // e.currentTarget.src = FileCorruptedIc;
}
