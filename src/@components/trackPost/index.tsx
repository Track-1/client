import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CommentBtnIc, TrackPostPauseBtnIc, TrackPostPlayBtnIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import { useTrackDetail } from "../../hooks/queries/tracks";
import BackButton from "../@common/backButton";
import AudioInfo from "./audioInfo";
import AudioTitle from "./audioTitle";
import Comments from "./comments";
import Download from "./download";
import ProducerProfile from "./producerProfile";
import ShowMore from "./showMore";
import TrackSearchHeader from "../trackSearch/trackSearchHeader/trackSearchHeader";
import Header from "../@common/header";

export default function TrackPost() {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const { id } = useParams();
  const {
    playAudio,
    stopAudio,
    setAudioFile,
    openAudioPlayer,
    playContextState,
    stopContextState,
    contextPlaying,
    getPlayerInfo,
  } = useContext(PlayerContext);
  const { trackDetail } = useTrackDetail(Number(id));


  function handleOpenComment() {
    setIsOpenComment(true);
  }

  function handleClosecomment() {
    setIsOpenComment(false);
  }

  function play() {
    setAudioFile(trackDetail?.trackAudioFile);
    openAudioPlayer();
    playContextState();
    playAudio();
  }

  function stop() {
    stopAudio();
    stopContextState();
  }

  useEffect(() => {
    getPlayerInfo({
      imageFile: trackDetail?.trackImageFile,
      title: trackDetail?.trackTitle,
      userName: trackDetail?.trackUserName,
    });
  }, []);

  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader />
      </Header>
      {isOpenComment && <Comments handleClosecomment={handleClosecomment} />}
      <TrackPostWrapper>
        <AudioBasicInfoWrapper>
          <BackButton prevURL="-1"/>
          <AudioTitle />
          <ProducerProfile />
          <MusicPlayingWrapper>
            <Download />
            {contextPlaying ? <TrackPostPauseBtnIcon onClick={stop} /> : <TrackPostPlayBtnIcon onClick={play} />}
            <ShowMore />
          </MusicPlayingWrapper>
        </AudioBasicInfoWrapper>
        <AudioInfo />
      </TrackPostWrapper>
      <CommentBtnIcon onClick={handleOpenComment} />
    </>
  );
}

const CommentBtnIcon = styled(CommentBtnIc)`
  position: fixed;
  width: 23rem;
  margin-top: 4.7rem;
  right: 7.5rem;

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
