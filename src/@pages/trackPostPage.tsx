import styled, { keyframes } from "styled-components";
// import JSZip from 'jszip';
// import {saveAs} from "file-saver";

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
import { useEffect, useState } from "react";
import EditDropDown from "../@components/trackPost/editDropDown";
import CategoryHeader from "../@components/@common/categoryHeader";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../recoil/player";
import Player from "../@components/@common/player";
import UserComment from "../@components/trackPost/userComment";
import CommentHeader from "../@components/trackPost/commentHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { getTrackInfo, closeTrack, getFileLink } from "../core/api/trackPost";
import { TrackInfoDataType } from "../type/tracksDataType";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Category } from "../core/constants/categoryHeader";
import usePlayer from "../utils/hooks/usePlayer";
import { blockAccess } from "../utils/common/privateRoute";
import Loading from "../@components/@common/loading";
import { isCookieNull, isLogin } from "../utils/common/isLogined";
import { reload } from "../recoil/main";
import useInfiniteKey from "../utils/hooks/useInfiniteKey";

export default function TrackPostPage() {
  const { state } = useLocation();
  // const {beatId} = useParams();
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
  const [trackInfoData, setTrackInfoData] = useState<TrackInfoDataType>();
  const [beatId, setBeatId] = useState<number>(state);
  const [audioInfos, setAudioInfos] = useState<any>({
    title: "",
    name: "",
    progress: "",
    duration: "",
    image: "",
  });

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [link, setLink] = useState<string>("");
  const [download, setDownload] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isReload, setIsReload] = useRecoilState<boolean>(reload);
  const { key, excuteGetData } = useInfiniteKey();
  const { progress, audio, pausesPlayerAudio, closePlayer } = usePlayer();

  useEffect(() => {
    setIsReload(true);
  }, []);

  window.onpopstate = function (event) {
    pausesPlayerAudio();
    closePlayer();
  };

  const { data, isLoading } = useQuery(["state", state, isClosed], () => getTrackInfo(state), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (data?.status === 200) {
        setTrackInfoData(data?.data.data);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    setWhom(Category.TRACKS);
  }, []);

  useEffect(() => {
    if (trackInfoData) {
      audio.src = trackInfoData?.beatWavFile;
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
    audio.src = "";
  }

  function closeComment() {
    setIsCommentOpen(false);
    setShowPlayer(false);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(closeTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("closing");
      setIsClosed(!isClosed);
    },
  });

  function closeTrackPost() {
    mutate(beatId);
  }

  function openTrackPost() {
    mutate(beatId);
  }

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;

    setAudioInfos(tempInfos);
  }

  const { data: fileLink } = useQuery(["beatId", download], () => getFileLink(state), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (download) {
        let blob = new Blob([data?.data], { type: "audio/mpeg" });
        let url = window.URL.createObjectURL(blob); //s3링크

        setLink(url);
        var a = document.createElement("a");
        a.href = url;
        a.download = `${trackInfoData?.title}`;
        document.body.appendChild(a);
        a.click();
        setTimeout((_: any) => {
          window.URL.revokeObjectURL(url);
        }, 60000);
        a.remove();
        setDownload(false);

        // let zip = new JSZip();
        // zip.file(`${trackInfoData?.title}`, url);
        // zip.generateAsync({ type: "base64", }).then(
        //   function( url )
        //   {
        //     var element = document.createElement('a');
        //     element.setAttribute('href', 'data:application/octastream;base64,' + url );
        //     element.setAttribute('download', `${trackInfoData?.title}` );
        //     element.style.display = 'none';
        //     document.body.appendChild(element); element.click();
        //     document.body.removeChild(element);
        //   }
        // );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function getFile() {
    blockAccess() ? navigate("/login") : !download && setDownload(true);
  }

  function checkIsMeOpen() {
    return trackInfoData?.isMe && !trackInfoData?.isClosed;
  }

  function checkIsMeClosed() {
    return trackInfoData?.isMe && trackInfoData?.isClosed;
  }

  function checkIsNotMeOpen() {
    return !trackInfoData?.isMe && !trackInfoData?.isClosed;
  }

  function checkIsNotMeClosed() {
    return !trackInfoData?.isMe && trackInfoData?.isClosed;
  }

  function movePreviousPage() {
    navigate(-1);
  }

  function moveToProducerProfile() {
    navigate(`/producer-profile/${trackInfoData?.producerId}`, { state: trackInfoData?.producerId });
  }

  return (
    <>
      {isLoading && <Loading />}
      {isCommentOpen && (
        <UserComment
          closeComment={closeComment}
          beatId={beatId}
          isClosed={trackInfoData?.isClosed}
          title={trackInfoData?.title}
        />
      )}
      {isCommentOpen ? <CommentHeader /> : <CategoryHeader pausesPlayerAudio={pauseAudio} />}

      <TrackPostPageWrapper>
        {trackInfoData && (
          <PostSection>
            <TitleContainer>
              <BackButtonWrapper onClick={movePreviousPage}>
                <BackButton pauseAudio={pauseAudio} />
              </BackButtonWrapper>
              <AudioTitle>{trackInfoData?.title}</AudioTitle>
              <ProducerBox>
                <ProfileImgWrapper>
                  <ProducerProfile src={trackInfoData?.producerProfileImage} alt="프로듀서 프로필 이미지" />
                </ProfileImgWrapper>
                <NickName onClick={moveToProducerProfile}>{trackInfoData?.producerName}</NickName>
              </ProducerBox>
              <ButtonWrapper>
                {checkIsMeOpen() && <OpenedIcon onClick={closeTrackPost} />}
                {checkIsMeClosed() && <ClosedWithXIcon onClick={openTrackPost} />}
                {checkIsNotMeOpen() && <DownloadBtnIcon onClick={getFile} />}
                {checkIsNotMeClosed() && <ClosedBtnIcon />}

                {!isCommentOpen && play ? (
                  <PauseBtnIcon onClick={pauseAudio} />
                ) : (
                  <SmallPlayBtnIcon onClick={playAudio} />
                )}
                {trackInfoData.isMe && <EditBtnIcon onClick={setEditDropDown} />}
              </ButtonWrapper>
              {isEditOpen && <EditDropDown trackInfoData={trackInfoData} />}
              {/* <EditDropDown /> */}
            </TitleContainer>
            <InfoContainer>
              <PlayImageWrapper className={!isCommentOpen && play ? "playAnimation" : "pauseAnimation"}>
                <PlayerImage src={trackInfoData.jacketImage} alt="재생 이미지" />
              </PlayImageWrapper>
              <DescriptionContainer>
                <CategoryBox>
                  <CategoryIcon />
                  {trackInfoData?.category}
                </CategoryBox>
                <HashTagBox>
                  <HashTagIconWrapper>
                    <HashTagIcon />
                  </HashTagIconWrapper>
                  <TagWrapper>
                    {trackInfoData?.keyword.map((tag: string) => (
                      <HashTag text={tag} />
                    ))}
                  </TagWrapper>
                </HashTagBox>
                <DescriptionBox>
                  <DescriptionIcon />
                  <TextBox>{trackInfoData?.introduce}</TextBox>
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

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AudioTitle = styled.h1`
  width: 47rem;

  ${({ theme }) => theme.fonts.title}

  color: ${({ theme }) => theme.colors.white};

  margin-top: 25.1rem;

  cursor: pointer;
`;

const ProducerBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1.2rem;
  margin-bottom: 3.4rem;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4.4rem;
  width: 4.4rem;
  margin-right: 1rem;

  border-radius: 6.5rem;
  overflow: hidden;
`;

const ProducerProfile = styled.img`
  height: 100%;
  width: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const NickName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id}

  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.sub1};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
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

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  position: absolute;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  position: absolute;
`;

const DescriptionContainer = styled.div`
  margin-left: 70rem;
`;

const CategoryBox = styled.article`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1}
`;

const CategoryIcon = styled(CategoryIc)`
  width: 12.3rem;
  margin-right: 4.1rem;
`;
const HashTagBox = styled.article`
  display: flex;

  margin-top: 2.7rem;
`;

const HashTagIcon = styled(HashtagIc)`
  width: 11.2rem;

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
  width: 14.6rem;
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
  width: 23rem;
  margin-top: 4.7rem;
  margin-right: 7.5rem;

  float: right;

  cursor: pointer;
`;

const Video = styled.video`
  background-color: pink;
`;

const PauseBtnIcon = styled(PauseBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;

const SmallPlayBtnIcon = styled(SmallPlayBtnIc)`
  width: 5.2rem;
  height: 5.2rem;
`;

const HashTagIconWrapper = styled.div`
  width: 16rem;
`;
