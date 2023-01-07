import styled from "styled-components";

import {
  DownloadBtnIc,
  PauseBtnIc,
  CategoryIc,
  HashtagIc,
  DescriptionIc,
  ClosedBtnIc,
  ClosedWithXIc,
  OpenedIc,
  EditBtnIc,
  SmallPlayBtnIc,
  CommentBtnIc,
} from "../assets";
import profileDummyImg from "../assets/image/profileDummyImg.png";
import playImg from "../assets/image/playImg.png";
import HashTag from "../@components/trackPost/hashTag";
import BackButton from "../@components/@common/backButton";
import { useEffect, useState, useMemo } from "react";
import EditDropDown from "../@components/trackPost/editDropDown";
import CategoryHeader from "../@components/@common/categoryHeader";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../recoil/player";
import Player from "../@components/@common/player";
import ditto from "../assets/audio/ditto.mp3";
import UserComment from "../@components/trackPost/userComment";
import CommentHeader from "../@components/trackPost/commentHeader";
import { useNavigate } from "react-router-dom";

export default function TrackPostPage() {
  const audio = useMemo(() => new Audio(ditto), [ditto]);

  const navigate = useNavigate();

  const [isMe, setIsMe] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(true);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  function setEditDropDown() {
    isEditOpen ? closeEdit() : openEdit();
  }
  function openEdit() {
    setIsEditOpen(true);
  }

  function closeEdit() {
    setIsEditOpen(false);
  }

  function playAudio() {
    console.log("00", audio.currentTime);
    audio.play();
    setPlay(true);
    setShowPlayer(true);

    audio.addEventListener("timeupdate", () => {
      goProgress();
    });
  }

  function pauseAudio() {
    console.log(audio.currentTime);
    audio.pause();
    setPlay(false);

    audio.removeEventListener("timeupdate", () => {
      goProgress();
    });
  }

  function goProgress() {
    const currentDuration = (audio.currentTime / audio.duration) * 100;

    setProgress(currentDuration);
  }

  function openComment() {
    setIsCommentOpen(true);
  }

  function closeComment() {
    setIsCommentOpen(false);
  }

  function movePreviousPage() {
    navigate(-1);
  }

  return (
    <>
      {isCommentOpen && <UserComment closeComment={closeComment} />}
      {isCommentOpen ? <CommentHeader /> : <CategoryHeader />}

      <>
        <PostSection>
          <TitleContainer>
            <BackButtonWrapper onClick={movePreviousPage}>
              <BackButton />
            </BackButtonWrapper>
            <AudioTitle>ABCDFKGHIJKL</AudioTitle>
            <ProducerBox>
              <ProducerProfile src={profileDummyImg}></ProducerProfile>
              <NickName>newjeans_</NickName>
            </ProducerBox>
            <ButtonWrapper>
              {isMe && (isEnd ? <ClosedBtnIcon /> : <OpenedIcon />)}
              {!isMe && (isEnd ? <ClosedWithXIcon /> : <DownloadBtnIcon />)}
              {play ? <PauseBtnIc onClick={pauseAudio} /> : <SmallPlayBtnIc onClick={playAudio} />}

              {isMe && <EditBtnIcon onClick={setEditDropDown} />}
            </ButtonWrapper>
            {isEditOpen && <EditDropDown />}
          </TitleContainer>
          <InfoContainer>
            <PlayImageWrapper>
              <PlayerImage src={playImg} alt="재생 이미지" />
            </PlayImageWrapper>
            <DescriptionContainer>
              <CategoryBox>
                <CategoryIcon />
                Rock
              </CategoryBox>
              <HashTagBox>
                <HashTagIcon />
                <TagWrapper>
                  <HashTag text="#ABCDEFG" />
                  <HashTag text="#ABCDEFG" />
                  <HashTag text="#ABCDEFG" />
                </TagWrapper>
              </HashTagBox>
              <DescriptionBox>
                <DescriptionIcon />
                <TextBox>
                  이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은
                  어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고
                  곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은
                  어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고 곡입니다이곡은 어쩌고저쩌고
                  곡입니다
                </TextBox>
              </DescriptionBox>
            </DescriptionContainer>
          </InfoContainer>
        </PostSection>
      </>
      <CommentBtnIcon onClick={openComment} />
      {showPlayer && <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} />}
    </>
  );
}

const PostSection = styled.section`
  display: flex;
`;

const TitleContainer = styled.section`
  margin-left: 7.6rem;

  display: flex;
  flex-direction: column;
`;

const BackButtonWrapper = styled.div``;

const AudioTitle = styled.h1`
  width: 47rem;

  ${({ theme }) => theme.fonts.title}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 25.1rem;
`;

const ProducerBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1.2rem;
  margin-bottom: 3.4rem;
`;

const ProducerProfile = styled.img`
  height: 4.4rem;
  width: 4.4rem;

  border-radius: 6.5rem;

  margin-right: 1rem;
`;

const NickName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id}
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DownloadBtnIcon = styled(DownloadBtnIc)`
  height: 5.2rem;
  width: 24.6rem;

  margin-right: 2rem;
`;

const ClosedBtnIcon = styled(ClosedBtnIc)`
  height: 5.2rem;
  width: 24.6rem;

  margin-right: 2rem;
`;

const ClosedWithXIcon = styled(ClosedWithXIc)`
  height: 5.2rem;
  width: 17.6rem;

  margin-right: 2rem;
`;

const OpenedIcon = styled(OpenedIc)`
  height: 5.2rem;
  width: 17.6rem;

  margin-right: 2rem;
`;

const EditBtnIcon = styled(EditBtnIc)`
  margin-left: 18.2rem;

  cursor: pointer;
`;

const InfoContainer = styled.section`
  height: 66.4rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  align-items: center;

  margin-top: 3.1rem;
  margin-left: 8.9rem;
`;

const PlayImageWrapper = styled.div`
  height: 60.4rem;
  width: 60.4rem;

  border-radius: 50%;

  margin-left: 3.6rem;

  overflow: hidden;
`;

const PlayerImage = styled.img`
  height: 60.4rem;
  width: 60.4rem;
`;

const DescriptionContainer = styled.div`
  margin-left: 5.1rem;
`;

const CategoryBox = styled.article`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1}
`;

const CategoryIcon = styled(CategoryIc)`
  margin-right: 4.1rem;
`;
const HashTagBox = styled.article`
  display: flex;

  margin-top: 2.7rem;
`;

const HashTagIcon = styled(HashtagIc)`
  height: 3.8rem;

  display: flex;
  align-items: center;

  margin-right: 4.1rem;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const DescriptionBox = styled.article`
  margin-top: 4.4rem;
`;

const DescriptionIcon = styled(DescriptionIc)`
  height: 3.8rem;

  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 51.5rem;
  ${({ theme }) => theme.fonts.description}
  font-family: "pretended";

  color: ${({ theme }) => theme.colors.gray2};
`;

const CommentBtnIcon = styled(CommentBtnIc)`
  margin-top: 4.7rem;
  margin-right: 7.5rem;

  float: right;
`;
