import styled from 'styled-components';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
import { MoreBtnIc } from '../../assets';
import { useGetRecentTracks } from '../../hooks/queries/tracks';
import { useState } from 'react';
import { FilteredTrackType } from '../../type/tracks';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';
import PlayCoverForm from '../common/Form/playCoverForm';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

export default function RecentTrackList() {
  const { recentTrackInfo } = useGetRecentTracks(4);
  const [playingTrack, setPlayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  const { handleMovePage } = useMovePage();

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPlayingTrack(trackId);
  }

  return (
    <section>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {TRACK_SECTION_TITLE}
        </Text>
        <MoreBtnIc onClick={() => handleMovePage('track-search')} />
      </SectionHeader>

      <TrackListWrapper>
        {recentTrackInfo &&
          recentTrackInfo.map((trackInfo) => (
            <TrackItem key={trackInfo.trackId}>
              <PlayCoverForm
                imageFile={trackInfo.trackImageFile}
                audioFile={trackInfo.trackAudioFile}
                audioId={trackInfo.trackId}
                audioTitle={trackInfo.trackTitle}
                userName={trackInfo.trackUserName}
                playingTrack={playingTrack}
                selectTrack={selectTrack}
                width={16}
                height={16}
                shape="rectangle"
                align="rightBottom"
              />

              <TrackInfoTextForm
                topItem={trackInfo.trackCategory}
                topItemColor="neon_green"
                middleItem={trackInfo.trackTitle}>
                <Text as="span" font="Pre_14_R" color="gray3">
                  {trackInfo.trackUserName}
                </Text>
              </TrackInfoTextForm>
            </TrackItem>
          ))}
      </TrackListWrapper>
    </section>
  );
}

const TrackListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  gap: 3rem 2rem;

  width: 100%;
`;

const TrackItem = styled.li`
  display: flex;
  flex-direction: column;

  gap: 1rem;

  width: 16rem;
`;
