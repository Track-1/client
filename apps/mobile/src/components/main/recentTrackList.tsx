import styled from 'styled-components';
import { MoreBtnIc } from '../../assets';
import { useGetRecentTracks } from '../../hooks/queries/tracks';
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
    <SectionContainer>
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
                <Text as="p" font="Pre_14_R" color="neon_green" margin="0 0 0.5rem 0">
                  {trackInfo.trackCategory}
                </Text>
                <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0" overflow="hidden">
                  {trackInfo.trackTitle}
                </Text>
                <Text as="p" font="Pre_14_R" color="gray3">
                  {trackInfo.trackUserName}
                </Text>
              </Link>
            </TrackItem>
          ))}
      </TrackListWrapper>
    </SectionContainer>
  );
}

const SectionContainer = styled.section`
  margin-bottom: 10rem;
`;

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
