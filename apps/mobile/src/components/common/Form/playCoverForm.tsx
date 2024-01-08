import styled from 'styled-components';
import { FilteredVocalType } from '../../../type/vocals';
import usePlaySelectedTrack from '../../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../../context/playerContext';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Cover } from 'track-1-design-system';

interface PlayCoverFormProps {
  imageFile: string;
  audioFile: string;
  audioId: number;
  audioTitle: string;
  userName: string;
  playingTrack: FilteredVocalType['userId'] | null;
  selectTrack: (userId: FilteredVocalType['userId']) => void;
  width: number;
  height: number;
  shape: 'circle' | 'rectangle' | 'window';
  align: 'rightBottom' | 'center';
}

export default function PlayCoverForm(props: PropsWithChildren<PlayCoverFormProps>) {
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
    <Container width={restProps.width} height={restProps.height}>
      <Cover
        imageUrl={imageFile}
        width={restProps.width}
        height={restProps.height}
        shape={restProps.shape}
        align={restProps.align}
        isPlay={isSelected && innerPlaying}
        onPlay={handlePlay}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;

  overflow: hidden;
`;
