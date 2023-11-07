import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { CommentsPlayerContext } from ".";
import { PlayerContext } from "../../context/playerContext";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function AudioJacketImage() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));
  const { contextPlaying } = useContext(PlayerContext);
  const { contextPlaying: commentContextPlaying } = useContext(CommentsPlayerContext);

  return (
    <PlayImageWrapper isPlay={!commentContextPlaying && contextPlaying}>
      <PlayerImage src={trackDetail?.trackImageFile} alt="재생 이미지" />
    </PlayImageWrapper>
  );
}

const RotateImage = keyframes`
    100% {transform: rotate(360deg)};
    `;

const PlayImageWrapper = styled.div<{ isPlay: boolean }>`
  height: 60.4rem;
  width: 60.4rem;

  border-radius: 50%;

  margin-left: 3.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  ${({ isPlay }) =>
    isPlay
      ? css`
          -webkit-animation: ${RotateImage} 15s infinite linear;
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
