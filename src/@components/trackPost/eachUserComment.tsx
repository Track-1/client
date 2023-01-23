import { useState } from "react";
import styled from "styled-components";
import { PauseBtnIc, PlayBtnIc } from "../../assets";
import { UserCommentType } from "../../type/userCommentsType";
import { useRecoilState } from "recoil";
import { showPlayerBar, playMusic } from "../../recoil/player";

interface dataType {
  data: UserCommentType;
  audio: HTMLAudioElement;
  clickedIndex: number;
  pauseAudio: () => void;
  clickComment: (index: number) => void;
  index: number;
}

export default function EachUserComment(props: dataType) {
  const { data, audio, clickedIndex, clickComment, index, pauseAudio } = props;
  const [isHover, setIsHover] = useState<boolean>(false);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  function changeHoverTrue() {
    setIsHover(true);
  }

  function changeHoverFalse() {
    setIsHover(false);
  }

  function playAudioOnTrack(id: number) {
    setShowPlayer(true);

    if (clickedIndex === id) {
      audio.play();
      setPlay(true);
    } else {
      setPlay(true);
      setShowPlayer(true);
      clickComment(index);
    }
  }

  return (
    <CommentContainer onMouseOver={changeHoverTrue} onMouseOut={changeHoverFalse}>
      <ProfileImage img={data.vocalProfileImage}>
        {isHover && (!play || clickedIndex !== index) && (
          <PlayerBlur onClick={() => playAudioOnTrack(index)}>
            <PlayBtnIc />
          </PlayerBlur>
        )}
        {play && clickedIndex === index && (
          <PlayerBlur onClick={pauseAudio}>
            <PauseBtnIc />
          </PlayerBlur>
        )}
      </ProfileImage>
      <InfoBox>
        <UserName>{data.vocalName}</UserName>
        <CommentText>{data.comment}</CommentText>
      </InfoBox>
    </CommentContainer>
  );
}

const CommentContainer = styled.article`
  position: relative;
  height: 14.2rem;

  display: flex;
  align-items: center;

  &:hover {
    border: 0.2rem solid transparent;
    border-top-left-radius: 11.7rem;
    border-bottom-left-radius: 11.7rem;
    background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
      linear-gradient(to right, ${({ theme }) => theme.colors.sub2}, ${({ theme }) => theme.colors.sub3});
    background-origin: border-box;
    background-clip: content-box, border-box;
  }
`;

const ProfileImage = styled.div<{ img: string }>`
  height: 9rem;
  width: 9rem;

  margin-right: 2rem;
  margin-left: 3.8rem;

  border-radius: 9rem;

  background-image: url(${({ img }) => img});
  background-repeat: no-repeat;
  background-size: contain;
`;

const PlayerBlur = styled.div`
  height: 9rem;
  width: 9rem;

  background-color: rgb(0, 0, 0, 0.5);
  backdrop-filter: blur(0.6rem);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  /* pointer-events: none; */
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.strong`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag}
`;

const CommentText = styled.strong`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.description}

  margin-top: 1.2rem;
`;
