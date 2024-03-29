import styled from 'styled-components';
import { PADDING_SIDE } from '../layout';
import { checkIsLogin, isProducer } from '../../utils/common/check';
import PlayIcon from '../common/Form/PlayIcon';
import { useRecoilValue } from 'recoil';
import { loginUserData } from '../../recoil/common/loginUserData';
import { FilteredTrackType } from '../../type/tracks';
import { useState } from 'react';
import { useGetRecentVocals } from '../../hooks/queries/vocals';
import { useGetRecentTracks } from '../../hooks/queries/tracks';
import { FilteredVocalType } from '../../type/vocals';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';

interface VocalPlaybarProps {
  playingTrack: number | null;
  selectTrack(id: FilteredTrackType['trackId'] | FilteredVocalType['userId']): void;
}

function VocalPlaybar(props: VocalPlaybarProps) {
  const { playingTrack, selectTrack } = props;
  const { recentVocalInfo } = useGetRecentVocals(4);

  const trackInfo = recentVocalInfo && recentVocalInfo[0] ? recentVocalInfo[0] : undefined;
  const { handleMovePage, checkUserPermission } = useMovePage();

  return (
    <>
      {trackInfo && (
        <>
          <a onClick={() => checkUserPermission() && handleMovePage('vocal-profile', trackInfo?.userId)}>
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

          <PlayIcon
            imageFile={trackInfo.userImageFile}
            audioId={trackInfo.userId}
            audioTitle={trackInfo.userTitle}
            audioFile={trackInfo.userAudioFile}
            userName={trackInfo.userName}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        </>
      )}
    </>
  );
}

interface ProducerPlaybarProps {
  playingTrack: number | null;
  selectTrack(id: FilteredTrackType['trackId'] | FilteredVocalType['userId']): void;
}

function ProducerPlaybar(props: ProducerPlaybarProps) {
  const { playingTrack, selectTrack } = props;

  const { recentTrackInfo } = useGetRecentTracks(4);

  const trackInfo = recentTrackInfo && recentTrackInfo[0] ? recentTrackInfo[0] : undefined;
  const { handleMovePage } = useMovePage();

  return (
    <>
      {trackInfo && (
        <>
          <a onClick={() => handleMovePage('track-post', trackInfo?.trackId)}>
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

          <PlayIcon
            imageFile={trackInfo.trackImageFile}
            audioId={trackInfo.trackId}
            audioTitle={trackInfo.trackTitle}
            audioFile={trackInfo.trackAudioFile}
            userName={trackInfo.trackUserName}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        </>
      )}
    </>
  );
}

export default function BannerPlaybar() {
  const { userType } = useRecoilValue(loginUserData);

  const [playingTrack, setPlayingTrack] = useState<FilteredTrackType['trackId'] | FilteredVocalType['userId'] | null>(
    null
  );

  function selectTrack(id: FilteredTrackType['trackId'] | FilteredVocalType['userId']) {
    setPlayingTrack(id);
  }

  return (
    <Container>
      {isProducer(userType) && checkIsLogin() ? (
        <>
          <VocalPlaybar playingTrack={playingTrack} selectTrack={selectTrack} />
        </>
      ) : (
        <>
          <ProducerPlaybar playingTrack={playingTrack} selectTrack={selectTrack} />
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
