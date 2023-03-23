import styled, { keyframes } from "styled-components";
import JSZip from 'jszip';
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
import { audioFile, playMusic, showPlayerBar } from "../recoil/player";
import Player from "../@components/@common/player";
import UserComment from "../@components/trackPost/userComment";
import CommentHeader from "../@components/trackPost/commentHeader";
import { useLocation, useParams } from "react-router-dom";
import { getTrackInfo, getAudioFile, closeTrack, getFileLink } from "../core/api/trackPost";
import { TrackInfoDataType } from "../type/tracksDataType";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { useQuery } from "react-query";
import { Category } from "../core/constants/categoryHeader";
import usePlayer from "../utils/hooks/usePlayer";
import { getCookie } from "../utils/cookie";
import axios from "axios";

interface IDownloadProps {
  fileName?: string;
  url?: string;
  data?: string | Blob;
}


export default function TrackPostPage() {
  const { state } = useLocation();
  const { progress, audio } = usePlayer();
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
  const [link, setLink] = useState<string>('');
  const [download, setDownload] = useState<boolean>(false);

  const { data } = useQuery(["state", state], () => getTrackInfo(state), {
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
    // setBeatId(state);
    audio.src = "";
  }

  function closeComment() {
    setIsCommentOpen(false);
  }

  function closeTrackPost() {
    closeTrack(beatId);
    console.log("dfdfdfdfdfdfddd");
  }

  function openTrackPost() {
    closeTrack(beatId);
    console.log("abababababab");
  }

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;

    setAudioInfos(tempInfos);
  }

  //() => onLogin(email, password, loginType)

  // const downloadFile = useCallback((fileName: string, fileLink: string) => {
  //   const blob = new Blob([fileLink], { type: "audio/mpeg" });
  //   console.log(blob);
  //   console.log(fileLink);
  //   const element = document.createElement("a");
  //   const url = window.URL.createObjectURL(blob);
  //   element.href = url;
  //   // element.href = fileLink;
  //   console.log(element.href);
  //   console.log(url);
  //   element.download = fileName;
  //   console.log(fileLink);
  //   console.log(audio.src);
  //   console.log(element);
  //   element.click();

  //   let reader = new FileReader();
  //   reader.readAsArrayBuffer(blob);
  // }, []);


  //
  // function downloadFile(){
  //   setDownload(!download);
  //     fetch('https://track-list-bucket.s3.ap-northeast-2.amazonaws.com/audio/1676873179537-%25E1%2584%2580%25E1%2585%25A9%25E1%2584%2585%25E1%2585%25A2%2520Dive%2520Into%2520You.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCCROMAZWQ2%2F20230224%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T063202Z&X-Amz-Expires=900&X-Amz-Signature=9cbabfdd5890f524ae677cbfef64f9d2f649899b75d2ea8feba8d3525afb3506&X-Amz-SignedHeaders=host', {method: 'GET'})
  // .then(res => {
  //   return res.blob();
  // })
  // .then(blob => {
  //   var url = window.URL.createObjectURL(blob);
  //   var a = document.createElement('a');
  //   a.href = url;
  //   a.download = 'a.mp3';
  //   document.body.appendChild(a); 
  //   a.click();  
  //   setTimeout(
  //     _ => { window.URL.revokeObjectURL(url); }, 
  //     60000); 
  //   a.remove(); 
  // })
  // .catch(err => {
  //   console.error('err: ', err);
  // })
  // }
// 'https://track-list-bucket.s3.ap-northeast-2.amazonaws.com/audio/1676873179537-%25E1%2584%2580%25E1%2585%25A9%25E1%2584%2585%25E1%2585%25A2%2520Dive%2520Into%2520You.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCCROMAZWQ2%2F20230224%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230224T063202Z&X-Amz-Expires=900&X-Amz-Signature=9cbabfdd5890f524ae677cbfef64f9d2f649899b75d2ea8feba8d3525afb3506&X-Amz-SignedHeaders=host'
 
const { data:fileLink } = useQuery(["beatId",download], ()=>getFileLink(state)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
        // setLink(data)
        console.log(data)
        // let blob = new Blob([new ArrayBuffer(data)], { type: "audio/mpeg" }); 
        let blob = new Blob([data?.data],{ type: "audio/mpeg" }); 
        console.log(blob)

        var url = window.URL.createObjectURL(blob); //여기가 잘 안되는 중
        console.log(url)
        setLink(url)
        // var a = document.createElement('a');
        // a.href = url;
        // a.download = 'a.mp3';
        // document.body.appendChild(a); 
        // a.click();  
        // setTimeout(_ => { window.URL.revokeObjectURL(url); }, 
        //   60000); 
        // a.remove(); 
        // return (
        //   <a href={url} download="asdf">dfdfdfdfd</a>
        // )
    },
    onError: error => {
      console.log("실패");
      console.log(error)
    }
  });

  // const downloadFile = useCallback(async (fileName: string, fileLink: string) => {
  //   const response = await getAudioFile(state, fileLink);
  //   console.log(response);
  //   console.log(fileName)
  // }, []);

  function downloadFile(){
    setDownload(!download)

  }


  

  return (
    <>
      {isCommentOpen && <UserComment closeComment={closeComment} beatId={beatId} isClosed={trackInfoData?.isClosed} />}
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
                {trackInfoData.isMe &&
                  (!trackInfoData?.isClosed ? (
                    <OpenedIcon onClick={closeTrackPost} />
                  ) : (
                    <ClosedWithXIcon onClick={openTrackPost} />
                  ))}
                {!trackInfoData.isMe &&
                  (!trackInfoData?.isClosed ? (
                    // <DownloadBtnIcon onClick={() => downloadFile("ㅇㅇ", audio.src)} />
                    <a href={link} download="제발되라"><DownloadBtnIcon onClick={downloadFile}/></a>
                    // <>
                    // <DownloadBtnIcon onClick={downloadFile}/>
                    // {/* <Video src={link}><DownloadBtnIcon/></Video> */}
                    // </>
                  ) : (
                    <ClosedBtnIcon />
                  ))}
                {play ? <PauseBtnIc onClick={pauseAudio} /> : <SmallPlayBtnIc onClick={playAudio} />}
                {trackInfoData.isMe && <EditBtnIcon onClick={setEditDropDown} />}
              </ButtonWrapper>
              {isEditOpen && <EditDropDown />}
              <EditDropDown />
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

  cursor: pointer;
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

const Video=styled.video`
  background-color: pink;
`