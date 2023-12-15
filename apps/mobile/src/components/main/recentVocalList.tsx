import styled, { CSSProperties } from 'styled-components';
import { SectionForm } from './common/sectionForm';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoForm from '../common/Form/trackInfoForm';
import SectionHeader from './common/sectionHeader';
import { MoreBtnIc } from '../../assets';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import { useState } from 'react';
import { FilteredVocalType } from '../../type/vocals';
import { CategoryType } from '../../type/common/category';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

export default function RecentVocalList() {
  const trackTitle = 'JETT (Deep House TRAP BEAT)';

  const { recentVocalInfo } = useGetRecentVocals(4);

  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  function selectTrack(userId: FilteredVocalType['userId']) {
    setPLayingTrack(userId);
  }

  if (recentVocalInfo === undefined) return null;

  console.log(recentVocalInfo[0]?.userCategory, recentVocalInfo[0]?.userCategoryNum);

  return (
    <SectionForm>
      <SectionHeader sectionTitle={VOCAL_SECTION_TITLE}>
        <MoreBtnIc />
      </SectionHeader>

      <VocalListWrapper>
        {recentVocalInfo.map((trackInfo) => (
          <VocalTrackWrapper key={trackInfo.userId}>
            {/* <PlayTrackForm
              trackInfo={trackInfo}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
              iconProperties={iconProperties}
              shapeProperties={shapeProperties}
              isPlaying={false}
            /> */}
            <TrackInfoForm
              topItem={`${trackInfo.userCategory[0]} +${trackInfo.userCategoryNum - 1}`}
              topItemColor="neon_pink"
              middleItem={trackInfo.userTitle}>
              {trackInfo.userKeyword.map((keyword) => (
                <VocalUserKeyword key={keyword}>#{keyword}</VocalUserKeyword>
              ))}
            </TrackInfoForm>
          </VocalTrackWrapper>
        ))}
      </VocalListWrapper>
    </SectionForm>
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

const shapeProperties: CSSProperties = {
  position: 'relative',

  width: '12rem',
  height: '12rem',

  marginRight: '2.5rem',

  borderRadius: '50%',
};

const iconProperties: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  width: '100%',
  height: '100%',
};
