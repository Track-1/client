import styled from 'styled-components';
import { ImageWrapper } from '../common/Interface';
import { useParams } from 'react-router-dom';
import { useTrackDetail } from '../../hooks/queries/tracks';
import { PADDING_SIDE } from '../layout';
import { Keyword, TrackInfoForm, TrackInfoWrapper, TrackProfileWrapper } from '../profile/common/userProfile';
import Text from '../common/Text';
import { Cover } from 'track-1-design-system';
import { PauseIc, PlayIc } from '../../assets';
import { useContext, useEffect, useState } from 'react';
import { PlayerContext } from '../../context/playerContext';
import { FilteredTrackType } from '../../type/tracks';
import usePlaySelectedTrack from '../../hooks/common/usePlaySelectedTrack';
import Download from './download';
import { StyledDivisionLine } from '../common/DivisionLine';
import { useMovePage } from '../../hooks/common/useMovePage';

export default function TrackPostContainer() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));
  const [playingTrack, setPLayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);
  const isSelected = playingTrack === trackDetail?.trackId;

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPLayingTrack(trackId);
  }

  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, isAudioPlaying, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, playAudioItem, stopAudioItem } = usePlaySelectedTrack(
    playerContext,
    trackDetail?.trackAudioFile || '',
    trackDetail?.trackId || 0,
    selectTrack
  );

  const { handleMovePage, checkUserPermission } = useMovePage();

  function handlePlay() {
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
      imageFile: trackDetail?.trackImageFile,
      title: trackDetail?.trackTitle,
      userName: trackDetail?.trackUserName,
    });
  }, [playingTrack]);

  return (
    <Container>
      <TrackImageWrapper imageUrl={trackDetail?.trackImageFile} />

      <UserInfoWrapper>
        <UserInfoTopWrapper>
          <Text as="span" font="Pre_25_SB" color="white">
            {trackDetail?.trackTitle}
          </Text>
          <Text as="span" font="Pre_16_R" color="neon_green">
            {trackDetail?.trackCategory}
          </Text>
        </UserInfoTopWrapper>
        <a onClick={() => checkUserPermission() && handleMovePage('producer-profile', trackDetail?.trackUserId)}>
          <UserProfileImageWrapper>
            <ImageWrapper width={3} height={3}>
              <Cover imageUrl={trackDetail?.userImageFile || ''} width={3} height={3} shape="circle" />
            </ImageWrapper>
            <Text as="p" font="Pre_16_R" color="gray1">
              {trackDetail?.trackUserName}
            </Text>
          </UserProfileImageWrapper>
        </a>
        <ButtonWrapper>
          <Download downloadId={Number(id)} />
          <ImageWrapper as="button" width={3} height={3} onClick={handlePlay}>
            {isSelected && isAudioPlaying() ? <PauseIc /> : <PlayIc />}
          </ImageWrapper>
        </ButtonWrapper>
      </UserInfoWrapper>

      <DivisionLine />

      <TrackProfileWrapper>
        <TrackInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Hashtag
          </Text>
          <TrackInfoWrapper>
            {trackDetail?.trackKeyword.map((keyword) => (
              <Keyword key={keyword}>{`#${keyword}`}</Keyword>
            ))}
          </TrackInfoWrapper>
        </TrackInfoForm>

        <TrackInfoForm>
          <Text as="h5" font="Pre_14_M" color="gray3">
            Description
          </Text>
          <TrackInfoWrapper>
            <Text as="span" font="Pre_14_R" color="white">
              {trackDetail?.trackIntroduction}
            </Text>
          </TrackInfoWrapper>
        </TrackInfoForm>
      </TrackProfileWrapper>
    </Container>
  );
}

const Container = styled.section`
  margin-bottom: 9.7rem;
`;

const TrackImageWrapper = styled.div<{ imageUrl?: string }>`
  width: calc(${`100% + ${PADDING_SIDE}*2`});
  aspect-ratio: 1/1;

  margin-left: ${`-${PADDING_SIDE}`};

  background-image: linear-gradient(180deg, #0d0e11 0%, rgba(13, 14, 17, 0) 100%), url(${({ imageUrl }) => imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const UserInfoWrapper = styled.div`
  width: 100%;

  margin-top: 3rem;
`;

const UserInfoTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const UserProfileImageWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  margin-top: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.5rem;

  width: 100%;

  margin-top: 4rem;
`;

const DivisionLine = styled(StyledDivisionLine)`
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
