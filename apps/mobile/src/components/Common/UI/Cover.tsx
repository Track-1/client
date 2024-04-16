import { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';
import Player from './Player';
import { PauseIc, PlayIc } from 'src/assets';
import { usePlay } from 'src/hooks/usePlay';

export type ImageCoverShapeTypes = 'circle' | 'squre';
export type ImageCoverSizeTypes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
export type IconPositionTypes = 'center' | 'middleLeft' | 'middleRight' | 'centerTop' | 'centerBottom' | 'rightBottom';

export interface ImageCoverProps {
  imageSrc: string;
  imageAlt: string;
  coverSize: ImageCoverSizeTypes;
  coverShape: ImageCoverShapeTypes;
}

export function ImageCover(props: PropsWithChildren<ImageCoverProps>) {
  const { imageSrc, imageAlt, coverSize, coverShape, children } = props;
  return (
    <StyledCoverContainer coverSize={coverSize} coverShape={coverShape}>
      {children}
      <StyledCoverImage src={imageSrc} alt={imageAlt} />
    </StyledCoverContainer>
  );
}

interface AudioIconCoverProps {
  audioSrc: string;
  audioTitle: string;
  userName: string;
}

export function AudioIconCover(props: AudioIconCoverProps) {
  const { audioSrc, audioTitle, userName } = props;
  const { isPlaying, handlePlay, showPlayer } = usePlay(audioSrc);

  return (
    <>
      <AudioCoverContainer onClick={handlePlay}>
        <>{isPlaying ? <PauseIcon /> : <PlayIcon />}</>
      </AudioCoverContainer>

      {showPlayer && (
        <Player isPlaying={isPlaying} audioTitle={audioTitle} userName={userName} handlePlay={handlePlay} />
      )}
    </>
  );
}

export interface AudioCoverProps extends AudioIconCoverProps {
  audioSrc: string;
  audioTitle: string;
  userName: string;
  iconPosition: IconPositionTypes;
}

export function AudioCover(props: PropsWithChildren<AudioCoverProps>) {
  const { audioSrc, audioTitle, userName, iconPosition, children } = props;
  const { isPlaying, handlePlay, showPlayer } = usePlay(audioSrc);

  return (
    <>
      <AudioCoverContainer onClick={handlePlay}>
        {children}
        {isPlaying ? <PauseIcon iconPosition={iconPosition} /> : <PlayIcon iconPosition={iconPosition} />}
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

const StyledCoverContainer = styled.div<{ coverSize: ImageCoverSizeTypes; coverShape: ImageCoverShapeTypes }>`
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

function getStyleCoverShape(shape: ImageCoverShapeTypes) {
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

function getStyleCoverSize(size: ImageCoverSizeTypes) {
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

function getStylePlayIconSize(size: ImageCoverSizeTypes) {
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
