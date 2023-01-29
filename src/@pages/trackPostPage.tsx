import styled, { keyframes } from "styled-components";

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
import HashTag from "../@components/trackPost/hashTag";
import BackButton from "../@components/@common/backButton";
import { useEffect, useState, useCallback } from "react";
import EditDropDown from "../@components/trackPost/editDropDown";
import CategoryHeader from "../@components/@common/categoryHeader";
import { useRecoilState, useRecoilValue } from "recoil";
import { playMusic, showPlayerBar } from "../recoil/player";
import Player from "../@components/@common/player";
import UserComment from "../@components/trackPost/userComment";
import CommentHeader from "../@components/trackPost/commentHeader";
import { useLocation } from "react-router-dom";
import { getTrackInfo } from "../core/api/trackPost";
import { TrackInfoDataType } from "../type/tracksDataType";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { useQuery } from "react-query";
import { Category } from "../core/constants/categoryHeader";
import { UserType } from "../recoil/main";
import useProgress from "../utils/hooks/useProgress";

export default function TrackPostPage() {
  const { state } = useLocation();

  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [trackInfoData, setTrackInfoData] = useState<TrackInfoDataType>();
  const [duration, setCurrentDuration] = useState<number>(0);
  const [beatId, setBeatId] = useState<number>(-1);
  const [fileLink, setFileLink] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [image, setImage] = useState<string>("");

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const user = useRecoilValue(UserType);

  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  const [audioInfos, setAudioInfos] = useState<any>({
    title: "",
    name: "",
    progress: "",
    duration: "",
    image: "",
  });

  const { progress, audio } = useProgress();

  useEffect(() => {
    setWhom(Category.TRACKS);
  }, []);

  useEffect(() => {
    trackInfoData && setTitle(trackInfoData.title);
    if (trackInfoData !== undefined) {
      audio.src = trackInfoData?.beatWavFile;
      setCurrentDuration(trackInfoData?.wavFileLength);

      getAudioInfos(
        trackInfoData?.title,
        trackInfoData?.producerName,
        trackInfoData?.jacketImage,
        trackInfoData?.wavFileLength,
      );
    }
  }, [trackInfoData]);

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
    audio.play();
    setPlay(true);
    setShowPlayer(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function openComment() {
    setIsCommentOpen(true);
    setShowPlayer(false);
    setBeatId(state);
    audio.src = "";
  }

  function closeComment() {
    setIsCommentOpen(false);
  }

  function endmyTrack() {
    setIsEnd(true);
  }

  function notEndmyTrack() {
    setIsEnd(false);
  }

  function isProducer() {
    return user === "producer";
  }

  function isVocal() {
    return user === "vocal";
  }

  const { data } = useQuery(["state", state], () => getTrackInfo(state), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setTrackInfoData(data?.data.data);
        setFileLink(data?.data.data.beatWavFile);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const downloadFile = useCallback((fileName: string, fileLink: string) => {
    const blob = new Blob([fileLink], { type: "audio/mp3" });
    const url = window.URL.createObjectURL(blob);

    const element = document.createElement("a");
    element.href = url;
    element.download = fileName;
    element.click();

    let reader = new FileReader();
    reader.readAsArrayBuffer(blob);
  }, []);

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;

    setAudioInfos(tempInfos);
  }

  return (
    <>
      {isCommentOpen && <UserComment closeComment={closeComment} beatId={beatId} />}
      {isCommentOpen ? <CommentHeader /> : <CategoryHeader />}

      <TrackPostPageWrapper>
        {trackInfoData && (
          <PostSection>
            <TitleContainer>
              <BackButtonWrapper>
                <BackButton />
              </BackButtonWrapper>
              <AudioTitle>{trackInfoData.title}</AudioTitle>
              <ProducerBox>
                <ProducerProfile
                  src={trackInfoData.producerProfileImage}
                  alt="프로듀서 프로필 이미지"></ProducerProfile>
                <NickName>{trackInfoData.producerName}</NickName>
              </ProducerBox>
              <ButtonWrapper>
                {trackInfoData.isMe && isProducer() && isEnd && <ClosedWithXIcon onClick={notEndmyTrack} />}
                {trackInfoData.isMe && isProducer() && !isEnd && <OpenedIcon onClick={endmyTrack} />}
                {/* {!trackInfoData.isMe && (isEnd ? <ClosedBtnIcon /> : <a href={trackInfoData.beatWavFile} download={trackInfoData.title}><DownloadBtnIcon /></a>)} */}
                {((!trackInfoData.isMe && isProducer() && isEnd) || (isVocal() && isEnd)) && <ClosedBtnIcon />}
                {((!trackInfoData.isMe && isProducer() && !isEnd) || (isVocal() && !isEnd)) && (
                  <button onClick={() => downloadFile(trackInfoData.title, trackInfoData.beatWavFile)}>
                    <DownloadBtnIcon />
                  </button>
                )}
                {/* {!trackInfoData.isMe && (isEnd ? <ClosedBtnIcon /> : <form action={fileLink}><button onClick={downloadFile}><DownloadBtnIcon /></button></form>)} */}
                {play ? <PauseBtnIc onClick={pauseAudio} /> : <SmallPlayBtnIc onClick={playAudio} />}

                {trackInfoData.isMe && <EditBtnIcon onClick={setEditDropDown} />}
              </ButtonWrapper>
              {isEditOpen && <EditDropDown />}
            </TitleContainer>
            <InfoContainer>
              <PlayImageWrapper className={play ? "playAnimation" : "pauseAnimation"}>
                <PlayerImage src={trackInfoData.jacketImage} alt="재생 이미지" />
              </PlayImageWrapper>
              <DescriptionContainer>
                <CategoryBox>
                  <CategoryIcon />
                  {trackInfoData.category}
                </CategoryBox>
                <HashTagBox>
                  <HashTagIcon />
                  <TagWrapper>
                    {trackInfoData.keyword.map((tag: string) => (
                      <HashTag text={tag} />
                    ))}
                  </TagWrapper>
                </HashTagBox>
                <DescriptionBox>
                  <DescriptionIcon />
                  <TextBox>{trackInfoData.introduce}</TextBox>
                </DescriptionBox>
              </DescriptionContainer>
            </InfoContainer>
          </PostSection>
        )}

        <CommentBtnIcon onClick={openComment} />
        {showPlayer && trackInfoData && (
          <Player
            audio={audio}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            progress={progress}
            // duration={duration}
            // title={trackInfoData?.title}
            // name={trackInfoData?.producerName}
            // image={image}
            audioInfos={audioInfos}
            play={play}
            setPlay={setPlay}
          />
        )}
      </TrackPostPageWrapper>
    </>
  );
}

const TrackPostPageWrapper = styled.div`
  position: fixed;
`;

const RotateImage = keyframes`
    100% {transform: rotate(360deg)};
    `;
const PostSection = styled.section`
  .playAnimation {
    -webkit-animation: ${RotateImage} 15s infinite linear;
  }
  .pauseAnimation {
    -webkit-animation: ${RotateImage} 15s infinite linear paused;
  }
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

  cursor: pointer;
`;
