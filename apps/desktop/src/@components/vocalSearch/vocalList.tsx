import styled from 'styled-components';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import VocalItem from './vocalItem';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DiscoverChanceIc } from '../../assets';
import { useFilteredVocals } from '../../hooks/queries/vocals';
import { FilteredVocalType } from '../../type/vocals';

export default function VocalList() {
  const [searchParams] = useSearchParams();
  const { vocalData, fetchNextPage, hasNextPage } = useFilteredVocals({
    limit: 10,
    categ: searchParams.getAll('categ'),
    trackSearch: Boolean(searchParams.get('trackSearch')),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  function selectTrack(trackId: FilteredVocalType['userId']) {
    setPLayingTrack(trackId);
  }

  if (vocalData === undefined) return null;

  return (
    <Container>
      <DiscoverChanceIcon />
      <ListWrapper>
        {vocalData.map((vocalInfo) => {
          return (
            <VocalItem
              vocalInfo={vocalInfo}
              key={vocalInfo.userId}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
            />
          );
        })}
      </ListWrapper>
      <div ref={observerRef} style={{ width: '100%', height: '20px' }} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;

  margin-left: 10rem;
`;

const ListWrapper = styled.section`
  display: flex;
  flex-wrap: wrap;

  margin-left: 30.9rem;
`;

const DiscoverChanceIcon = styled(DiscoverChanceIc)`
  width: 143.8rem;
  height: 21rem;
  margin-left: 30.9rem;
`;
