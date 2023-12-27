import styled, { css } from 'styled-components';
import { FilteredVocalType } from '../../../type/vocals';
import usePlaySelectedTrack from '../../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../../context/playerContext';
import { PropsWithChildren, useContext, useEffect } from 'react';
import { Cover } from 'track-1-design-system';

interface PlayVocalFormProps {
  trackInfo: FilteredVocalType;
  playingTrack: FilteredVocalType['userId'] | null;
  selectTrack: (userId: FilteredVocalType['userId']) => void;
  width: number;
  height: number;
  shape: 'circle' | 'rectangle' | 'window';
  align: 'rightBottom' | 'center';
}

export default function PlayVocalForm(props: PropsWithChildren<PlayVocalFormProps>) {
  const { trackInfo, playingTrack, selectTrack, children, ...restProps } = props;

  const isSelected = playingTrack === trackInfo.userId;

  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    trackInfo.userAudioFile,
    trackInfo.userId,
    selectTrack
  );

  function handlePlay() {
    if (contextPlaying) {
      if (playingTrack === trackInfo.userId) {
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
      imageFile: trackInfo.userImageFile,
      title: trackInfo.userTitle,
      userName: trackInfo.userName,
    });
  }, [playingTrack]);

  return (
    <Container onClick={handlePlay} width={restProps.width} height={restProps.height}>
      <Cover
        imageUrl={trackInfo.userImageFile}
        width={restProps.width}
        height={restProps.height}
        shape={restProps.shape}
        align={restProps.align}
        isPlay={playingTrack === trackInfo.userId && contextPlaying && innerPlaying}
      />
    </Container>
  );
}

const Container = styled.div<{ width: number; height: number }>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;

  overflow: hidden;
`;
