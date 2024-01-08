import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { CategoryType } from '../../type/common/category';
import Text from '../common/Text';
import { MoreDotIc, PlayingIc } from '../../assets';
import { ImageWrapper } from '../common/Interface';
import { useState } from 'react';
import DetailTrack from '../common/Modal/DetailTrack';
import { FilteredTrackType } from '../../type/tracks';

interface TrackSearchItemProps {
  trackInfo: FilteredTrackType;
  isSelected: boolean;
}

export default function TrackSearchItem(props: PropsWithChildren<TrackSearchItemProps>) {
  const { trackInfo, isSelected, children } = props;

  const [openModal, setOpenModal] = useState(false);

  function showModal() {
    setOpenModal(true);
  }

  function unShowModal() {
    setOpenModal(false);
  }

  return (
    <Container>
      {children}
      <TrackItemInfoWrapper>
        <TrackUserInfoWrapper>
          <TrackTitleWrapper>
            <Text as="p" font="Pre_14_M" color="white">
              {trackInfo.trackTitle}
            </Text>
            {isSelected && <PlayingIc />}
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

      <DetailTrack openModal={openModal} showModal={showModal} unShowModal={unShowModal} detailId={trackInfo.trackId} />
    </Container>
  );
}

const Container = styled.li`
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

  width: calc(100% - 12.8rem);
  height: 100%;

  padding: 0.1rem 0;
`;

const TrackCategoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.8rem;
`;
