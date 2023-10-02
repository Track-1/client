import { useState } from "react";
import styled from "styled-components";
import { CommentBtnIc } from "../../assets";
import BackButton from "../@common/backButton";
import AudioInfo from "./audioInfo";
import AudioTitle from "./audioTitle";
import Comments from "./comments";
import Download from "./download";
import PlayButton from "./playButton";
import ProducerProfile from "./producerProfile";
import ShowMore from "./showMore";

export default function TrackPost() {
  const [isOpenComment, setIsOpenComment] = useState(false);

  function handleOpenComment() {
    setIsOpenComment(true);
  }

  function handleClosecomment() {
    setIsOpenComment(false);
  }

  return (
    <>
      {isOpenComment && <Comments handleClosecomment={handleClosecomment} />}

      <TrackPostWrapper>
        <AudioBasicInfoWrapper>
          <BackButton />
          <AudioTitle />
          <ProducerProfile />
          <MusicPlayingWrapper>
            <Download />
            <PlayButton />
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
