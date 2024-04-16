import styled from 'styled-components';
// import { useMovePage } from '../../hooks/common/useMovePage';
import { Link } from 'react-router-dom';
import { useGetRecentVocals } from 'track-1-shared';
import Text from 'src/components/Common/Text';
import { SectionHeader } from './recentTrackList';
import { MoreBtnIc } from 'src/assets';
import AlbumCard from 'src/components/Common/UI/AlbumCard';

const VOCAL_SECTION_TITLE = 'New Vocals\n For producer';

export default function RecentVocalList() {
  const { recentVocalInfo } = useGetRecentVocals(3);
  // const { handleMovePage, checkUserPermission } = useMovePage();

  return (
    <section>
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
              <AlbumCard
                imageSrc={trackInfo.userImageFile}
                imageAlt={'앨범 자켓 이미지'}
                coverSize="lg"
                coverShape="circle"
                audioSrc={trackInfo.userAudioFile}
                audioTitle={trackInfo.userTitle}
                userName={trackInfo.userName}
                iconPosition="center"
              />

              {/* <a onClick={() => checkUserPermission() && handleMovePage('vocal-profile', trackInfo.userId)}> */}
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
              {/* </a> */}
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
