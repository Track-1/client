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
import { Link } from 'react-router-dom';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

interface RecentTrackListProps {
  playingTrack: number | null;
  selectTrack: <T extends number>(trackId: T) => void;
}

export default function RecentTrackList(props: RecentTrackListProps) {
  const { playingTrack, selectTrack } = props;
  const { recentTrackInfo } = useGetRecentTracks(4);

  const { handleMovePage } = useMovePage();

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

              <Link to={`/track-post/${trackInfo.trackId}`}>
                <TrackInfoTextForm
                  topItem={trackInfo.trackCategory}
                  topItemColor="neon_green"
                  middleItem={trackInfo.trackTitle}>
                  <Text as="span" font="Pre_14_R" color="gray3">
                    {trackInfo.trackUserName}
                  </Text>
                </TrackInfoTextForm>
              </Link>
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
