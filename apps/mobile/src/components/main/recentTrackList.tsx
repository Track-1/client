import styled, { CSSProperties } from 'styled-components';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoTextForm from '../common/Form/trackInfoTextForm';
import { MoreBtnIc } from '../../assets';
import { useGetRecentTracks } from '../../hooks/queries/tracks';
import { useState } from 'react';
import { FilteredTrackType } from '../../type/tracks';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

export default function RecentTrackList() {
  const { recentTrackInfo } = useGetRecentTracks(4);
  const [playingTrack, setPlayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  const { handleMovePage } = useMovePage();
  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPlayingTrack(trackId);
  }

  return (
    <>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {TRACK_SECTION_TITLE}
        </Text>
        <MoreBtnIc onClick={() => handleMovePage('track-search')} />
      </SectionHeader>

      <TrackListWrapper>
        {recentTrackInfo &&
          recentTrackInfo.map((trackInfo) => (
            <TrackWrapper key={trackInfo.trackId}>
              <PlayTrackForm
                trackInfo={trackInfo}
                playingTrack={playingTrack}
                selectTrack={selectTrack}
                isPlaying={true}
              />
              <TrackInfoTextForm
                topItem={trackInfo.trackCategory}
                topItemColor="neon_green"
                middleItem={trackInfo.trackTitle}>
                {trackInfo.trackUserName}
              </TrackInfoTextForm>
            </TrackWrapper>
          ))}
      </TrackListWrapper>
    </>
  );
}

const TrackListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  gap: 3rem 2rem;

  width: 100%;
`;

const TrackWrapper = styled.li`
  width: 16rem;
`;
