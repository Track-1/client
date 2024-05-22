import styled from 'styled-components';
import BackButton from '../@common/button/backButton';
import Header from '../@common/layout/header';
import HomeLogo from '../@common/homeLogo';
import Player from '../@common/player';
import TrackSearchHeader from '../trackSearch/trackSearchHeader/trackSearchHeader';
import AudioInfo from './audioInfo';
import AudioTitle from './audioTitle';
import Comments from './comments';
import Download from './download';
import ProducerProfile from './producerProfile';
import ShowMore from './showMore';
import { useEffect, useState } from 'react';
import { CommentBtnIc, TrackPostPauseBtnIc, TrackPostPlayBtnIc } from '../../assets';
import { useTrackDetail } from '../../hooks/queries/tracks';
import { PlayUseContext } from '../../context/playerContext';

export default function TrackPost() {
  const {
    playAudio,
    stopAudio,
    setAudioFile,
    openAudioPlayer,
    playContextState,
    stopContextState,
    contextPlaying,
    getPlayerInfo,
    quitAudioForMovePage,
  } = PlayUseContext({});
  const { contextPlaying: commentContextPlaying } = PlayUseContext({ scope: 'comments' });
  const { trackDetail } = useTrackDetail();
  const [isOpenComment, setIsOpenComment] = useState(false);

  function handleOpenComment() {
    quitAudioForMovePage();
    setIsOpenComment(true);
  }

  function handleClosecomment(quitCommentAudio: () => void) {
    quitCommentAudio();
    setIsOpenComment(false);
  }

  function play() {
    if (!trackDetail) return;

    setAudioFile(trackDetail.trackAudioFile, trackDetail.trackId, trackDetail.trackId);
    openAudioPlayer();
    playContextState();
    playAudio();
  }

  function stop() {
    stopAudio();
    stopContextState();
  }

  useEffect(() => {
    if (!commentContextPlaying) return;

    quitAudioForMovePage();
  }, [commentContextPlaying]);

  useEffect(() => {
    getPlayerInfo({
      imageFile: trackDetail?.trackImageFile,
      title: trackDetail?.trackTitle,
      userName: trackDetail?.trackUserName,
    });
  }, []);

  return (
    <>
      <Header>
        <HomeLogo />
        <TrackSearchHeader pageType="tracks" />
      </Header>
      <TrackPostWrapper>
        <AudioBasicInfoWrapper>
          <BackButton />
          <TrackPostInform>
            <AudioTitle />
            <ProducerProfile />
            <MusicPlayingWrapper>
              <Download />
              {contextPlaying ? <TrackPostPauseBtnIcon onClick={stop} /> : <TrackPostPlayBtnIcon onClick={play} />}
              <ShowMore />
            </MusicPlayingWrapper>
          </TrackPostInform>
        </AudioBasicInfoWrapper>
        <AudioInfo />
      </TrackPostWrapper>
      <CommentBtnIcon onClick={handleOpenComment} />
      {isOpenComment && (
        <>
          <Comments handleClosecomment={handleClosecomment} trackContextPlaying={contextPlaying} />
          <Player scope="comments" />
        </>
      )}
    </>
  );
}

const TrackPostInform = styled.div`
  display: flex;
  flex-direction: column;
  height: 60rem;

  justify-content: center;
`;

const CommentBtnIcon = styled(CommentBtnIc)`
  width: 23rem;
  margin-top: 4rem;
  margin-right: 7.5rem;

  float: right;

  cursor: pointer;
`;

const MusicPlayingWrapper = styled.section`
  display: flex;
`;

const AudioBasicInfoWrapper = styled.li`
  display: flex;
  flex-direction: column;

  margin-left: 7.6rem;
`;

const TrackPostWrapper = styled.ul`
  display: flex;
`;

const TrackPostPauseBtnIcon = styled(TrackPostPauseBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;

const TrackPostPlayBtnIcon = styled(TrackPostPlayBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;
