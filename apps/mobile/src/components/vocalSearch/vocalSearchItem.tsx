import styled from 'styled-components';
import { PauseIc, PlayIc } from '../../assets';
import Text from '../common/Text';
import { FilteredVocalType } from '../../type/vocals';
import { useContext, useEffect } from 'react';
import usePlaySelectedTrack from '../../hooks/common/usePlaySelectedTrack';
import { PlayerContext } from '../../context/playerContext';
import { HashtagWrapper, ImageWrapper } from '../common/Interface';
import { useMovePage } from '../../hooks/common/useMovePage';
import { Link } from 'react-router-dom';

interface VocalSearchItemProps {
  trackInfo: FilteredVocalType;
  playingTrack: FilteredVocalType['userId'] | null;
  selectTrack: (userId: FilteredVocalType['userId']) => void;
}

export default function VocalSearchItem(props: VocalSearchItemProps) {
  const { trackInfo, playingTrack, selectTrack } = props;

  const { handleMovePage, checkUserPermission } = useMovePage();

  const isSelected = playingTrack === trackInfo.userId;

  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, isAudioPlaying, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    trackInfo.userAudioFile,
    trackInfo.userId,
    selectTrack
  );

  function handlePlay() {
    if (!trackInfo.userAudioFile) {
      alert('해당 음원이 존재하지 않습니다!');
      return;
    }

    if (isSelected) {
      if (innerPlaying) {
        stopAudioItem();
      } else {
        playAudioItem();
      }
    } else {
      playAudioItem();
    }
  }

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: trackInfo.userImageFile,
      title: trackInfo.userTitle,
      userName: trackInfo.userName,
    });
  }, [playingTrack]);

  return (
    <Container>
      <ImageContainer userImageFile={trackInfo.userImageFile}>
        <InnerWrapper>
          <HashtagWrapper>
            {trackInfo.userKeyword.map((keyword) => (
              <Text as="p" font="Pre_12_R" color="gray2">{`#${keyword}`}</Text>
            ))}
          </HashtagWrapper>
          <ImageWrapper width={3} height={3} onClick={handlePlay}>
            {isSelected && isAudioPlaying() ? <PauseIc /> : <PlayIc />}
          </ImageWrapper>
        </InnerWrapper>
      </ImageContainer>
      <UserInfoWrapper>
        <a onClick={() => checkUserPermission() && handleMovePage('vocal-profile', trackInfo.userId)}>
          <Text as="p" font="Pre_14_R" color="neon_pink" margin="0 0 0.5rem 0">
            {trackInfo.userCategory[0]
              ? `${trackInfo.userCategory[0]} ${trackInfo.userCategoryNum > 1 ? `+${trackInfo.userCategoryNum}` : ''}`
              : ''}
          </Text>
          <Text as="p" font="Alex_16_R" color="white" margin="0 0 1rem 0">
            {trackInfo.userName}
          </Text>
        </a>
      </UserInfoWrapper>
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: 16rem;
  padding-bottom: -1rem;
`;

const ImageContainer = styled.div<{ userImageFile: string }>`
  display: flex;
  flex-direction: column-reverse;

  width: 100%;
  height: 19rem;

  padding: 1.5rem;

  border-radius: 8rem 8rem 0 0;

  background-image: linear-gradient(to top, #0d0e11 0%, rgba(250, 250, 250, 0)),
    url(${({ userImageFile }) => userImageFile});

  background-size: 180%;
  background-position: center;
  background-repeat: no-repeat;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const UserInfoWrapper = styled.div`
  text-align: center;
  width: 100%;
`;
