import styled, { CSSProperties } from 'styled-components';
import { SectionForm } from './common/sectionForm';
import PlayTrackForm from '../common/Form/playTrackForm';
import TrackInfoForm from '../common/Form/trackInfoForm';
import SectionHeader from './common/sectionHeader';
import { MoreBtnIc } from '../../assets';
import { useGetRecentTracks } from '../../hooks/queries/tracks';
import { useState } from 'react';
import { FilteredTrackType } from '../../type/tracks';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

export default function RecentTrackList() {
  const { recentTrackInfo } = useGetRecentTracks(4);
  const [playingTrack, setPlayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPlayingTrack(trackId);
  }

  if (recentTrackInfo === undefined) return null;

  return (
    <SectionForm>
      <SectionHeader sectionTitle={TRACK_SECTION_TITLE}>
        <MoreBtnIc />
      </SectionHeader>

      <TrackListWrapper>
        {recentTrackInfo.map((trackInfo) => (
          <TrackWrapper key={trackInfo.trackId}>
            <PlayTrackForm
              trackInfo={trackInfo}
              playingTrack={playingTrack}
              selectTrack={selectTrack}
              iconProperties={iconProperties}
              shapeProperties={shapeProperties}
              isPlaying={true}
            />
            <TrackInfoForm
              topItem={trackInfo.trackCategory}
              topItemColor="neon_green"
              middleItem={trackInfo.trackTitle}>
              {trackInfo.trackUserName}
            </TrackInfoForm>
          </TrackWrapper>
        ))}
      </TrackListWrapper>
    </SectionForm>
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

const shapeProperties: CSSProperties = {
  position: 'relative',

  width: '16rem',
  height: '16rem',

  marginBottom: '1rem',
};

const iconProperties: CSSProperties = {
  position: 'absolute',

  right: '1rem',
  bottom: '1rem',
};
