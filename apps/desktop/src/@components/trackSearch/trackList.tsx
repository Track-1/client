import styled from 'styled-components';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import ListTitle from './listTitle';
import TrackItem from './trackItem';
import QueryString from 'qs';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilteredTracks } from '../../hooks/queries/tracks';
import { FilteredTrackType } from '../../type/tracks';

export default function TrackList() {
  const { categ } = QueryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  const initialCateg = categ ? (typeof categ === 'string' ? [categ] : (categ as string[])) : [];
  const { data, fetchNextPage, hasNextPage } = useFilteredTracks({
    limit: 10,
    categ: initialCateg,
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPLayingTrack(trackId);
  }

  if (data === undefined) return null;

  return (
    <Container>
      <ListTitle />
      {data.map((trackInfo, index) => {
        return (
          <TrackItem
            trackInfo={trackInfo}
            key={trackInfo.trackId}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        );
      })}
      <div ref={observerRef} style={{ width: '100%', height: '20px' }} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin-left: 30.9rem;
`;
