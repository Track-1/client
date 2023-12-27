import styled, { CSSProperties, css } from 'styled-components';
import { PauseIc, PlayIc } from '../../../assets';
import { FilteredVocalType } from '../../../type/vocals';
import { FilteredTrackType } from '../../../type/tracks';
import usePlaySelectedTrack from '../../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../../context/playerContext';
import { useContext, useEffect } from 'react';

interface PlayTrackFormProps {
  trackInfo: FilteredTrackType | FilteredTrackType;
  playingTrack: FilteredTrackType['trackId'] | null;
  selectTrack: (trackId: FilteredTrackType['trackId'] | FilteredVocalType['userId']) => void;
  isPlaying: boolean;
}

export default function PlayTrackForm(props: PlayTrackFormProps) {
  const { trackInfo, playingTrack, selectTrack, isPlaying } = props;

  console.log(typeof trackInfo);

  const isSelected = playingTrack === trackInfo.trackId;
  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    trackInfo.trackAudioFile,
    trackInfo.trackId,
    selectTrack
  );

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: trackInfo.trackImageFile,
      title: trackInfo.trackTitle,
      userName: trackInfo.trackUserName,
    });
  }, [playingTrack]);

  return (
    <Container>
      <ImageWrapper isPlaying={isPlaying} >
        <TrackImage src={trackInfo.trackImageFile} alt="track 이미지" />
        <IconWrapper>
          {isSelected && showPlayer && innerPlaying && contextPlaying ? (
            <PauseIc onClick={stopAudioItem} />
          ) : (
            <PlayIc onClick={playAudioItem} />
          )}
        </IconWrapper>
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div`
  overflow: hidden;
`;

const ImageWrapper = styled.div<{ isPlaying: boolean }>`
  width: 100%;
  height: 100%;

  object-fit: cover;
  overflow: hidden;

  ${(props) =>
    props.isPlaying
      ? css`
          background: rgba(13, 14, 17, 0.5);
        `
      : css`
          background: transparent;
        `}
`;

const TrackImage = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
