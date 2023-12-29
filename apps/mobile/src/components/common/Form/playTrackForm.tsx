import styled, { css } from 'styled-components';
import { FilteredVocalType } from '../../../type/vocals';
import { FilteredTrackType } from '../../../type/tracks';
import usePlaySelectedTrack from '../../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../../context/playerContext';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Cover } from 'track-1-design-system';

interface PlayTrackFormProps {
  trackInfo: FilteredTrackType;
  playingTrack: FilteredTrackType['trackId'] | null;
  selectTrack: (trackId: FilteredTrackType['trackId']) => void;
  width: number;
  height: number;
  shape: 'circle' | 'rectangle' | 'window';
  align: 'rightBottom' | 'center';
}

export default function PlayTrackForm(props: PropsWithChildren<PlayTrackFormProps>) {
  const { trackInfo, playingTrack, selectTrack, children, ...restProps } = props;

  const isSelected = playingTrack === trackInfo.trackId;

  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, isAudioPlaying, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    trackInfo.trackAudioFile,
    trackInfo.trackId,
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
      imageFile: trackInfo.trackImageFile,
      title: trackInfo.trackTitle,
      userName: trackInfo.trackUserName,
    });
  }, [playingTrack]);

  return (
    <Container width={restProps.width} height={restProps.height}>
      <Cover
        imageUrl={trackInfo.trackImageFile}
        width={restProps.width}
        height={restProps.height}
        shape={restProps.shape}
        align={restProps.align}
        isPlay={isSelected && isAudioPlaying()}
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
