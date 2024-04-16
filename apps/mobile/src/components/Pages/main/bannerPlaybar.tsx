import { useRecoilValue } from 'recoil';
import Text from 'src/components/Common/Text';
import { AudioIconCover } from 'src/components/Common/UI/Cover';
import { PADDING_SIDE } from 'src/constant/style';
import { loginUserData } from 'src/recoil/common/loginUserData';
import styled from 'styled-components';
import {
  checkIsLogin,
  checkIsProducer,
  FilteredTrackType,
  FilteredVocalType,
  useGetRecentTracks,
  useGetRecentVocals,
} from 'track-1-shared';

function VocalPlaybar() {
  const { recentVocalInfo } = useGetRecentVocals(4);

  const trackInfo = recentVocalInfo && recentVocalInfo[0] ? recentVocalInfo[0] : undefined;
  // const { handleMovePage, checkUserPermission } = useMovePage();

  return (
    <>
      {trackInfo && (
        <>
          {/* <a onClick={() => checkUserPermission() && handleMovePage('vocal-profile', trackInfo?.userId)}> */}
          <a>
            <Text as="p" font="Pre_14_R" color="neon_pink" margin="0 0 0.5rem 0">
              {`${trackInfo.userCategory[0]} +${trackInfo.userCategoryNum}`}
            </Text>
            <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
              {trackInfo.userTitle}
            </Text>
          </a>
          <KeywordWrapper>
            {trackInfo.userKeyword.map((keyword) => (
              <Text as="p" font="Pre_14_R" color="white">
                {`#${keyword}`}
              </Text>
            ))}
          </KeywordWrapper>
        </>
      )}
    </>
  );
}

function ProducerPlaybar() {
  const { recentTrackInfo } = useGetRecentTracks(4);

  const trackInfo = recentTrackInfo && recentTrackInfo[0] ? recentTrackInfo[0] : undefined;
  // const { handleMovePage } = useMovePage();

  return (
    <>
      {trackInfo && (
        <>
          {/* <a onClick={() => handleMovePage('track-post', trackInfo?.trackId)}> */}
          <a>
            <Text as="p" font="Pre_14_R" color="neon_green" margin="0 0 0.5rem 0">
              {trackInfo.trackCategory}
            </Text>
            <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
              {trackInfo.trackTitle}
            </Text>
            <Text as="p" font="Pre_14_R" color="white">
              {trackInfo.trackUserName}
            </Text>
          </a>

          {/* <MusicCover
            imageSrc=""
            imageAlt=""
            coverSize="sm"
            coverShape="circle"
            audioSrc={trackInfo.trackAudioFile}
            audioTitle={trackInfo.trackTitle}
            userName={trackInfo.trackUserName}
            iconPosition="center"></MusicCover> */}

          <AudioIconCover
            audioSrc={trackInfo.trackAudioFile}
            audioTitle={trackInfo.trackTitle}
            userName={trackInfo.trackUserName}
          />
          {/* <PlayIcon
            imageFile={trackInfo.trackImageFile}
            audioId={trackInfo.trackId}
            audioTitle={trackInfo.trackTitle}
            audioFile={trackInfo.trackAudioFile}
            userName={trackInfo.trackUserName}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          /> */}
        </>
      )}
    </>
  );
}

export default function BannerPlaybar() {
  const { userType } = useRecoilValue(loginUserData);

  return (
    <Container>
      {checkIsProducer(userType) && checkIsLogin() ? (
        <>
          <VocalPlaybar />
        </>
      ) : (
        <>
          <ProducerPlaybar />
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: calc(${`100% + ${PADDING_SIDE}*2`});

  padding: 2.2rem 2.5rem;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

const KeywordWrapper = styled.div`
  display: flex;
  gap: 0.5rem;

  width: 100%;
`;
