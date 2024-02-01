import styled from 'styled-components';
import RecentVocalItem from './recentVocalItem';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import { useState } from 'react';
import { FilteredVocalType } from '../../type/vocals';

export default function RecentVocalList() {
  const { recentVocalInfo } = useGetRecentVocals(6);
  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  function selectTrack(userId: FilteredVocalType['userId']) {
    setPLayingTrack(userId);
  }

  if (recentVocalInfo === undefined) return null;

  return (
    <Styled.Container>
      {recentVocalInfo?.map((vocalInfo) => (
        <RecentVocalItem
          vocalInfo={vocalInfo}
          playingTrack={playingTrack}
          selectTrack={selectTrack}
          key={vocalInfo.userId}
        />
      ))}
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.ul`
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
    gap: 10rem 0;
  `,
};
