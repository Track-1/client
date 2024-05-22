import styled, { css, keyframes } from 'styled-components';
import useControlPlayer from '../../hooks/common/useControlPlayer';
import { useTrackDetail } from '../../hooks/queries/tracks';
import { PlayUseContext } from '../../context/playerContext';

export default function AudioJacketImage() {
  const { trackDetail } = useTrackDetail();
  const { contextPlaying, audio } = PlayUseContext({});
  const { contextPlaying: commentContextPlaying } = PlayUseContext({ scope: 'comments' });
  const { currentTimeText, totalTimetext } = useControlPlayer(audio, contextPlaying);

  return (
    <PlayImageWrapper isPlay={!commentContextPlaying && contextPlaying} isMusicEnd={currentTimeText === totalTimetext}>
      <PlayerImage src={trackDetail?.trackImageFile} alt="재생 이미지" />
    </PlayImageWrapper>
  );
}

const RotateImage = keyframes`
    100% {transform: rotate(360deg)};
    `;

const PlayImageWrapper = styled.div<{ isPlay: boolean; isMusicEnd: boolean }>`
  height: 60.4rem;
  width: 60.4rem;

  border-radius: 50%;

  margin-left: 3.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  ${({ isPlay, isMusicEnd }) =>
    isPlay
      ? css`
          -webkit-animation: ${RotateImage} 15s infinite linear;
        `
      : isMusicEnd
      ? css`
          transform: rotate(0deg);
        `
      : css`
          -webkit-animation: ${RotateImage} 15s infinite linear paused;
        `}
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;
