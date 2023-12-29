import { useSearchParams } from 'react-router-dom';
import { useFilteredTracks } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import TrackSearchItem from './trackSearchItem';
import PlayTrackForm from '../common/Form/playTrackForm';
import { FilteredTrackType } from '../../type/tracks';
import { useCallback, useState } from 'react';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import styled from 'styled-components';
import { FilterIc } from '../../assets';
import { ImageWrapper } from '../common/Interface';
import { StyledLined } from '../common/DivisionLine';
import { PADDING_SIDE } from '../layout';

export default function TrackSearchContainer() {
  const [searchParams] = useSearchParams();

  const { trackData, fetchNextPage, hasNextPage } = useFilteredTracks({
    limit: 10,
    categ: searchParams.getAll('categ'),
  });

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  const [playingTrack, setPLayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPLayingTrack(trackId);
  }

  if (trackData === undefined) return null;

  return (
    <>
      <Text as="h1" font="Alex_25_R" color="white" margin="2rem 0 3.1rem" lineHeight="130%">
        {'New Tracks for\n Limitless Chance'}
      </Text>

      <section>
        <TrackListHeader>
          <TracksTextWrapper>
            <Text as="p" font="Pre_14_M" color="gray4">
              Tracks
            </Text>
          </TracksTextWrapper>
          <TrackListHeaderWrapper>
            <Text as="p" font="Pre_14_M" color="gray4">
              Category
            </Text>
            <ImageWrapper width={3} height={3}>
              <FilterIc />
            </ImageWrapper>
          </TrackListHeaderWrapper>
        </TrackListHeader>
        <DivisionLine />
        <ul>
          {trackData?.map((trackInfo) => (
            <>
              <TrackSearchItem
                trackTitle={trackInfo.trackTitle}
                trackUserName={trackInfo.trackUserName}
                trackCategory={trackInfo.trackCategory}
                isSelected={trackInfo.trackId === playingTrack}>
                <PlayTrackForm
                  trackInfo={trackInfo}
                  playingTrack={playingTrack}
                  selectTrack={selectTrack}
                  width={4}
                  height={4}
                  shape="rectangle"
                  align="center"
                />
              </TrackSearchItem>
              <DivisionLine />
            </>
          ))}
        </ul>
      </section>
      {/* <div ref={observerRef} style={{ width: '100%', height: '20px' }} /> */}
    </>
  );
}

const TrackListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-nt: space-between;

  width: 100%;
  height: 4.9rem;
`;

const TracksTextWrapper = styled.div`
  width: calc(100% - 11.8rem);
`;

const TrackListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.8rem;
  height: 100%;
`;

const DivisionLine = styled(StyledLined)`
  width: calc(${`100% + ${PADDING_SIDE}*2`});

  margin-left: ${`-${PADDING_SIDE}`};
`;
