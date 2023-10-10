import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CommentBtnIc, TrackPostPauseBtnIc, TrackPostPlayBtnIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePaly from "../../hooks/common/usePlay";
import { useTrackDetail } from "../../hooks/queries/tracks";
import BackButton from "../@common/backButton";
import Header from "../@common/header";
import Player from "../@common/player";
import TrackSearchHeader from "../trackSearch/trackSearchHeader/trackSearchHeader";
import AudioInfo from "./audioInfo";
import AudioTitle from "./audioTitle";
import Comments from "./comments";
import Download from "./download";
import ProducerProfile from "./producerProfile";
import ShowMore from "./showMore";

export const CommentsPlayerContext = createContext<any>({
  playAudio: () => {},
  stopAudio: () => {},
  quitAudio: () => {},
  setAudioFile: (url: string) => {},
  openAudioPlayer: () => {},
  closeAudioPlayer: () => {},
  playContextState: (playInnerState?: () => void) => {},
  stopContextState: (stopInnerState?: () => void) => {},
  showPlayer: false,
  contextPlaying: false,
  audio: new Audio(),
  playerInfo: {},
  getPlayerInfo: (info: any) => {},
  quitAudioForMovePage: () => {},
});

export function CommentsPlayerProvider({ children }: PropsWithChildren) {
  const {
    playAudio,
    stopAudio,
    quitAudio,
    setAudioFile,
    openAudioPlayer,
    closeAudioPlayer,
    playContextState,
    stopContextState,
    showPlayer,
    contextPlaying,
    audio,
  } = usePaly();
  const [playerInfo, setPlayerInfo] = useState();

  function getPlayerInfo(info: any) {
    setPlayerInfo(info);
  }

  function quitAudioForMovePage() {
    quitAudio();
    closeAudioPlayer();
  }

  return (
    <CommentsPlayerContext.Provider
      value={{
        playAudio,
        stopAudio,
        quitAudio,
        setAudioFile,
        openAudioPlayer,
        closeAudioPlayer,
        playContextState,
        stopContextState,
        showPlayer,
        contextPlaying,
        audio,
        playerInfo,
        getPlayerInfo,
        quitAudioForMovePage,
      }}>
      {children}
    </CommentsPlayerContext.Provider>
  );
}

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
    quitAudioForMovePage,
  } = useContext(PlayerContext);
  const { contextPlaying: commentContextPlaying } = useContext(CommentsPlayerContext);

  const { trackDetail } = useTrackDetail(Number(id));

  function handleOpenComment() {
    quitAudioForMovePage();
    setIsOpenComment(true);
  }

  function handleClosecomment(quitCommentAudio: () => void) {
    quitCommentAudio();
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
  }, [trackDetail]);

  useEffect(() => {
    if (!commentContextPlaying) return;

    quitAudioForMovePage();
  }, [commentContextPlaying]);

  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader pageType="tracks" />
      </Header>
      {isOpenComment && (
        <>
          <Comments handleClosecomment={handleClosecomment} trackContextPlaying={contextPlaying} />
          <Player comment />
        </>
      )}

      <TrackPostWrapper>
        <AudioBasicInfoWrapper>
          <BackButton prevURL="-1" />
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
