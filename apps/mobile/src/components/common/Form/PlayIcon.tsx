import styled from 'styled-components';
import { FilteredVocalType } from '../../../type/vocals';
import usePlaySelectedTrack from '../../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../../context/playerContext';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Cover } from 'track-1-design-system';
import { ImageWrapper } from '../Interface';
import { PauseIc, PlayIc } from '../../../assets';
import { FilteredTrackType } from '../../../type/tracks';

interface PlayIconProps {
  imageFile: string;
  audioFile: string;
  audioId: number;
  audioTitle: string;
  userName: string;
  playingTrack: FilteredVocalType['userId'] | FilteredTrackType['trackId'] | null;
  selectTrack: (userId: FilteredVocalType['userId'] | FilteredTrackType['trackId']) => void;
}

export default function PlayIcon(props: PropsWithChildren<PlayIconProps>) {
  const { imageFile, audioFile, audioId, audioTitle, userName, playingTrack, selectTrack, children, ...restProps } =
    props;

  const isSelected = playingTrack === audioId;

  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, isAudioPlaying, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    audioFile,
    audioId,
    selectTrack
  );

  function handlePlay() {
    if (isSelected) {
      if (innerPlaying) {
        stopAudioItem();
      } else {
        playAudioItem();
      }
    } else {
      playAudioItem();
    }
  }

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: imageFile,
      title: audioTitle,
      userName: userName,
    });
  }, [playingTrack]);

  return (
    <ImageWrapper as="button" width={3} height={3} onClick={handlePlay}>
      {isSelected && isAudioPlaying() ? <PauseIc /> : <PlayIc />}
    </ImageWrapper>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;

  overflow: hidden;
`;
