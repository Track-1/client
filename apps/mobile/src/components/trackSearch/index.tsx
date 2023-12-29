import { useSearchParams } from 'react-router-dom';
import { useFilteredTracks } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import TrackSearchItem from './trackSearchItem';
import PlayTrackForm from '../common/Form/playTrackForm';
import { FilteredTrackType } from '../../type/tracks';
import { useState } from 'react';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import { PlayerProvider } from '../../context/playerContext';

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
      <Text as="h1" font="Alex_25_R" color="white" margin="2rem 0 4.7rem" lineHeight="130%">
        {'New Tracks for\n Limitless Chance'}
      </Text>

      <section>
        <ul>
          {trackData?.map((trackInfo) => (
            <TrackSearchItem
              trackTitle={trackInfo.trackTitle}
              trackUserName={trackInfo.trackUserName}
              trackCategory={trackInfo.trackCategory}>
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
          ))}
        </ul>
      </section>
      {/* <div ref={observerRef} style={{ width: '100%', height: '20px' }} /> */}
    </>
  );
}
