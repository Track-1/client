import styled from 'styled-components';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
import { MoreBtnIc } from '../../assets';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import { useState } from 'react';
import { FilteredVocalType } from '../../type/vocals';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';
import PlayCoverForm from '../common/Form/playCoverForm';
import { Link } from 'react-router-dom';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

export default function RecentVocalList() {
  const { recentVocalInfo } = useGetRecentVocals(4);
  const { handleMovePage } = useMovePage();

  const [playingTrack, setPLayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  function selectTrack(userId: FilteredVocalType['userId']) {
    setPLayingTrack(userId);
  }

  return (
    <section>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {VOCAL_SECTION_TITLE}
        </Text>
        <MoreBtnIc
          onClick={() => {
            handleMovePage('vocal-search');
          }}
        />
      </SectionHeader>

      <VocalListWrapper>
        {recentVocalInfo &&
          recentVocalInfo.map((trackInfo) => (
            <VocalTrackWrapper key={trackInfo.userId}>
              <PlayCoverForm
                imageFile={trackInfo.userImageFile}
                audioFile={trackInfo.userAudioFile}
                audioId={trackInfo.userId}
                audioTitle={trackInfo.userTitle}
                userName={trackInfo.userName}
                playingTrack={playingTrack}
                selectTrack={selectTrack}
                width={12}
                height={12}
                shape="circle"
                align="center"
              />

              <Link to={`/vocal-profile/${trackInfo.userId}`}>
                <TrackInfoTextForm
                  topItem={`${trackInfo.userCategory[0]} +${trackInfo.userCategoryNum - 1}`}
                  topItemColor="neon_pink"
                  middleItem={trackInfo.userTitle}>
                  {trackInfo.userKeyword.map((keyword) => (
                    <VocalUserKeyword key={keyword}>#{keyword}</VocalUserKeyword>
                  ))}
                </TrackInfoTextForm>
              </Link>
            </VocalTrackWrapper>
          ))}
      </VocalListWrapper>
    </section>
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
  gap: 2.5rem;

  width: 100%;
`;

const VocalUserKeyword = styled.span`
  margin-bottom: 0.5rem;
`;

const VocalTrackImageWrapper = styled.div`
  width: 12rem;
  height: 12rem;

  overflow: hidden;
`;
