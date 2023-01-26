import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import { Category } from "../core/constants/categoryHeader";
import { showPlayerBar, playMusic } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { getVocalProfile } from "../core/api/vocalProfile";
import { VocalPortfolioType, VocalProfileType } from "../type/vocalProfile";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { UserType } from "../recoil/main";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import usePlay from "../utils/hooks/usePlay";

export default function VocalProfilePage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);
  // const [play, setPlay] = useRecoilState<boolean>(playMusic);
  // const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<VocalProfileType>();
  const [portfolioData, setPortfolioData] = useState<VocalPortfolioType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  // const audio = useMemo(() => new Audio(), []);

  const { play, setPlay, progress, setProgress, audio } = usePlay();

  useEffect(() => {
    setWhom(Category.TRACKS);
  }, []);

  const { state } = useLocation();
  useEffect(() => {
    setShowPlayer(false);
  });

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

  // const fetch = useCallback(async () => {
  //   const accessToken =
  //   userType === "producer"
  //     ? `${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`
  //     : `${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`;
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.REACT_APP_BASE_URL}/profile/vocal/${state}?page=${page.current}&limit=3`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       },
  //     );
  //     setPortfolioData((prev) => prev && [...prev, ...data?.data?.producerPortfolio]);

  //     setHasNextPage(data?.data.producerPortfolio.length === 4);
  //     if (data?.data.producerPortfolio.length) {
  //       page.current += 1;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // useEffect(() => {
  //   // if (!targetRef.current || !hasNextPage) return;
  //   const io = new IntersectionObserver((entries, observer) => {
  //     if (entries[0].isIntersecting) {
  //       fetch();
  //     }
  //   });
  //   io.observe(targetRef.current);

  //   return () => {
  //     io.disconnect();
  //   };
  // }, [fetch, hasNextPage]);

  //end

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);

  // useEffect(()=>{
  //   console.log("isMe입력", isMe)
  // },[isMe])

  function playAudio() {
    audio.play();
    setPlay(true);
    setShowPlayer(true);
  }

  // function playAudio() {
  //   audio.play();
  //   setPlay(true);

  //   console.log(play);
  // }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  useEffect(() => {
    if (play) {
      audio.addEventListener("timeupdate", () => {
        goProgress();
      });
    } else {
      audio.removeEventListener("timeupdate", () => {
        goProgress();
      });
    }
  }, [play]);

  function goProgress() {
    if (audio.duration) {
      const currentDuration = (audio.currentTime / audio.duration) * 100;
      console.log(audio.currentTime, audio.duration);
      setProgress(currentDuration);
      checkAudioQuit();
    }
  }

  function checkAudioQuit() {
    audio.duration === audio.currentTime && setPlay(false);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  function getAudioInfos(title: string, image: string) {
    setTitle(title);
    setImage(image);
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
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              getDuration={getDuration}
              infiniteRef={targetRef}
              getAudioInfos={getAudioInfos}
              play={play}
              setPlay={setPlay}
            />
          )}
          <VocalProfileShadow />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>
      <PlayerWrapper></PlayerWrapper>

      {showPlayer && profileData && (
        <Player
          audio={audio}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          progress={progress}
          duration={duration}
          title={title}
          name={profileData?.name}
          image={image}
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
