import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import { Category } from "../core/constants/categoryHeader";
import { playMusic, showPlayerBar } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { useState, useEffect, useRef, useCallback } from "react";
import { getVocalProfile } from "../core/api/vocalProfile";
import { VocalPortfolioType, VocalProfileType } from "../type/vocalProfile";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { UserType } from "../recoil/main";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import useProgress from "../utils/hooks/useProgress";

export default function VocalProfilePage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<VocalProfileType>();
  const [portfolioData, setPortfolioData] = useState<VocalPortfolioType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [audioInfos, setAudioInfos] = useState({
    title: "",
    name: "",
    progress: "",
    duration: 0,
    image: "",
  });

  const { progress, audio } = useProgress();

  useEffect(() => {
    setWhom(Category.TRACKS);
  }, []);

  const { state } = useLocation();
  useEffect(() => {
    setShowPlayer(false);
  }, []);

  // infinite
  const targetRef = useRef<any>();
  const page = useRef<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const userType = useRecoilValue(UserType);

  const fetch = useCallback(async () => {
    const accessToken =
      userType === "producer"
        ? `${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`
        : `${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`;
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/profile/producer/2?page=${page.current}&limit=3`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setPortfolioData((prev) => prev && [...prev, ...data?.data?.producerPortfolio]);
      console.log(page.current);
      console.log(portfolioData);

      setHasNextPage(data?.data.producerPortfolio.length === 4);
      if (data?.data.producerPortfolio.length) {
        page.current += 1;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        fetch();
      }
    });
    io.observe(targetRef.current);

    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextPage]);

  //end

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);

  const { data } = useQuery(["state", state, userType], () => getVocalProfile(state, userType), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (data?.status === 200 && page.current === 1) {
        setIsMe(data?.data.data.isMe);
        setProfileData(data?.data.data.vocalProfile);
        setPortfolioData(data?.data.data.vocalPortfolio);
        console.log(data?.data.data);
      }
    },
    onError: (error) => {
      console.log("실패");
    },
  });

  //end

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);

  function playAudio() {
    audio.play();
    setPlay(true);
    // setShowPlayer(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  // function getAudioInfos(title: string, image: string) {
  //   setTitle(title);
  //   setImage(image);
  // }

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;

    setAudioInfos(tempInfos);
  }

  return (
    <Wrap>
      {visible && <TracksProfileUploadModalSection />}
      <VocalProfile>{profileData && <ProducerInfos profileData={profileData} />}</VocalProfile>
      <VocalProfilePageWrapper>
        <VocalProfileWrapper>
          {portfolioData && (
            <VocalProfileList
              isMe={isMe}
              portfolioData={portfolioData}
              audio={audio}
              pauseAudio={pauseAudio}
              getDuration={getDuration}
              infiniteRef={targetRef}
              getAudioInfos={getAudioInfos}
              vocalName={profileData?.name}
            />
          )}
          <VocalProfileShadow />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>
      {/* <PlayerWrapper></PlayerWrapper> */}

      {showPlayer && (
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
    </Wrap>
  );
}

// infinite
// const InfiniteDiv = styled.div`
//   width: 100%;
//   height: 6rem;
//   background-color: pink;
// `;

const Wrap = styled.div`
  display: flex;
`;

const TracksProfileUploadModalSection = styled(TracksProfileUploadModal)`
  position: absolute;
  z-index: 100;
`;

const VocalProfilePageWrapper = styled.section`
  display: flex;
`;

const VocalProfileWrapper = styled.article`
  display: flex;
`;

const VocalProfile = styled.article`
  width: 60rem;
  background-color: white;

  font-size: 5rem;
`;

const PlayerWrapper = styled.div`
  position: sticky;
  bottom: 0;
`;
