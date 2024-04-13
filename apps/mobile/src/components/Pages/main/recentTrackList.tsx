import styled from 'styled-components';
import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { useGetRecentTracks } from 'track-1-shared';
import Text from 'src/components/Common/Text';
import { MoreBtnIc } from 'src/assets';
import AlbumCard from 'src/components/Common/UI/AlbumCard';

const TRACK_SECTION_TITLE = 'New Tracks\n For vocal';

interface RecentTrackListProps {
  // playingTrack: number | null;
  // selectTrack: <T extends number>(trackId: T) => void;
}

export function RecentTrackList(props: RecentTrackListProps) {
  // const { playingTrack, selectTrack } = props;
  const { recentTrackInfo } = useGetRecentTracks(4);

  // const { handleMovePage } = useMovePage();

  return (
    <SectionContainer>
      <SectionHeader>
        <Text as="h2" color="white" font="Alex_20_M">
          {TRACK_SECTION_TITLE}
        </Text>
        {/* <MoreBtnIc onClick={() => handleMovePage('track-search')} /> */}
        <MoreBtnIc />
      </SectionHeader>

      <TrackListWrapper>
        {recentTrackInfo &&
          recentTrackInfo.map((trackInfo) => (
            <TrackItem key={trackInfo.trackId}>
              <AlbumCard
                imageSrc={trackInfo.trackImageFile}
                imageAlt={'앨범 자켓 이미지'}
                coverSize="md"
                coverShape="squre"
                audioSrc={trackInfo.trackAudioFile}
                audioTitle={trackInfo.trackTitle}
                userName={trackInfo.trackUserName}
                iconPosition="rightBottom"
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  width: 100%;

  margin-bottom: 3rem;
`;

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
