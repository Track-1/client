import styled from 'styled-components';
import { PropsWithChildren, useContext, useEffect } from 'react';
import Text from '../common/Text';
import { MoreDotIc, PlayingIc } from '../../assets';
import { EmptyBox, ImageWrapper } from '../common/Interface';
import { useState } from 'react';
import DetailTrack from '../common/Modal/DetailTrack';
import { FilteredTrackType } from '../../type/tracks';
import { Cover } from 'track-1-design-system';
import { PlayerContext } from '../../context/playerContext';
import usePlaySelectedTrack from '../../hooks/common/usePlaySelectedTrack';

interface TrackSearchItemProps {
  trackInfo: FilteredTrackType;
  isSelected: boolean;
  playingTrack: number | null;
  selectTrack(trackId: FilteredTrackType['trackId']): void;
}

export default function TrackSearchItem(props: PropsWithChildren<TrackSearchItemProps>) {
  const { trackInfo, isSelected, playingTrack, selectTrack, children } = props;

  const [openModal, setOpenModal] = useState(false);

  function showModal() {
    setOpenModal(true);
  }

  function unShowModal() {
    setOpenModal(false);
  }

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
    <Container>
      <ImageWrapper width={4} height={4}>
        <Cover
          imageUrl={trackInfo.trackImageFile}
          width={4}
          height={4}
          shape={'rectangle'}
          align={'center'}
          isPlay={isSelected && innerPlaying}
          onPlay={handlePlay}
        />
      </ImageWrapper>

      <TrackItemInfoWrapper>
        <TrackUserInfoWrapper
          onClick={() => {
            selectTrack(trackInfo.trackId);
            handlePlay();
          }}>
          <TrackTitleWrapper>
            <TrackTitle>{trackInfo.trackTitle}</TrackTitle>

            <ImageWrapper width={1.7} height={1.7}>
              {isSelected && <PlayingIc />}
            </ImageWrapper>

            {/* {isSelected && <PlayingIcon />} */}
          </TrackTitleWrapper>
          <Text as="p" font="Pre_12_R" color="white">
            {trackInfo.trackUserName}
          </Text>
        </TrackUserInfoWrapper>
        <TrackCategoryWrapper>
          <Text as="p" font="Pre_14_R" color="neon_green">
            {trackInfo.trackCategory}
          </Text>
          <ImageWrapper as="button" width={3} height={3}>
            <MoreDotIc width={30} height={30} onClick={showModal} />
          </ImageWrapper>
        </TrackCategoryWrapper>
      </TrackItemInfoWrapper>

      {openModal && (
        <DetailTrack
          openModal={openModal}
          showModal={showModal}
          unShowModal={unShowModal}
          detailId={trackInfo.trackId}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 8rem;

  padding: 2rem 0;
`;

const TrackTitleWrapper = styled.div`
  display: flex;

  gap: 0.5rem;
`;

const TrackItemInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  margin-left: 1rem;
`;

const TrackUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 12rem);

  padding: 0.1rem 0;
`;

const TrackCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.8rem;
`;

const TrackTitle = styled.div`
  ${({ theme }) => theme.fonts.Pre_14_M};
  color: ${({ theme }) => theme.colors.white};

  overflow: hidden;
  text-overflow: ellipsis;
`;
