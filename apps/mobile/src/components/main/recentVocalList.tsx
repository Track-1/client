import styled, { CSSProperties } from 'styled-components';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
import { MoreBtnIc } from '../../assets';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import { useState } from 'react';
import { FilteredVocalType } from '../../type/vocals';
import { CategoryType } from '../../type/common/category';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

export default function RecentVocalList() {
  const trackTitle = 'JETT (Deep House TRAP BEAT)';

  const { recentVocalInfo } = useGetRecentVocals(4);

  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  function selectTrack(userId: FilteredVocalType['userId']) {
    setPLayingTrack(userId);
  }

  return (
    <>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {VOCAL_SECTION_TITLE}
        </Text>
        <MoreBtnIc />
      </SectionHeader>

      <VocalListWrapper>
        {recentVocalInfo &&
          recentVocalInfo.map((trackInfo) => (
            <VocalTrackWrapper key={trackInfo.userId}>
              {/* <PlayTrackForm
              trackInfo={trackInfo}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
              isPlaying={false}
            /> */}
              <TrackInfoTextForm
                topItem={`${trackInfo.userCategory[0]} +${trackInfo.userCategoryNum - 1}`}
                topItemColor="neon_pink"
                middleItem={trackInfo.userTitle}>
                {trackInfo.userKeyword.map((keyword) => (
                  <VocalUserKeyword key={keyword}>#{keyword}</VocalUserKeyword>
                ))}
              </TrackInfoTextForm>
            </VocalTrackWrapper>
          ))}
      </VocalListWrapper>
    </>
  );
}

const VocalListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 3rem;

  width: 100%;
`;

const VocalTrackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2.5rem;

  width: 100%;
`;

const VocalUserKeyword = styled.span`
  margin-bottom: 0.5rem;
`;
