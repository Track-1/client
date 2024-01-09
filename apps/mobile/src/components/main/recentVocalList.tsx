import styled from 'styled-components';
import { MoreBtnIc } from '../../assets';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import SectionHeader from './common/sectionHeader';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';
import PlayCoverForm from '../common/Form/playCoverForm';
import { Link } from 'react-router-dom';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

interface RecentVocalListProps {
  playingTrack: number | null;
  selectTrack: <T extends number>(trackId: T) => void;
}

export default function RecentVocalList(props: RecentVocalListProps) {
  const { playingTrack, selectTrack } = props;
  const { recentVocalInfo } = useGetRecentVocals(3);
  const { handleMovePage } = useMovePage();

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
                <Text as="p" font="Pre_14_R" color="neon_pink" margin="0 0 0.5rem 0">
                  {trackInfo.userCategory[0] ? `${trackInfo.userCategory[0]} +${trackInfo.userCategoryNum}` : ''}
                </Text>
                <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
                  {trackInfo.userName}
                </Text>
                {trackInfo.userKeyword.map((keyword) => (
                  <Text as="p" font="Pre_14_R" color="gray3" margin="0 0 0.5rem 0" key={keyword}>
                    {`# ${keyword}`}
                  </Text>
                ))}
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
