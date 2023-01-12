import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import { Category } from "../core/common/categoryHeader";
import { showPlayerBar, playMusic } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { getVocalProfile } from "../core/api/vocalProfile";
import { VocalPortfolioType, VocalProfileType } from "../type/vocalProfile";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { UserType } from "../recoil/main";

export default function VocalProfilePage() {
  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<VocalProfileType>();
  const [portfolioData, setPortfolioData] = useState<VocalPortfolioType[]>([]);

  const audio = useMemo(() => new Audio(), []);

  const { state } = useLocation();

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
    // if (!targetRef.current || !hasNextPage) return;
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
      if (data?.status === 200) {
        setIsMe(data?.data.data.isMe);
        setProfileData(data?.data.data.vocalProfile);
        setPortfolioData(data?.data.data.vocalPortfolio);
      }
    },
    onError: (error) => {
      console.log("실패");
    },
  });

  // useEffect(()=>{
  //   console.log("isMe입력", isMe)
  // },[isMe])

  function playAudio() {
    audio.play();
    setPlay(true);
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
    }
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  return (
    <Wrap>
      {visible && <TracksProfileUploadModalSection />}
      <VocalProfile>보컬프로필 부분넣어주세요</VocalProfile>
      <VocalProfilePageWrapper>
        <VocalProfileWrapper>
          {portfolioData && (
            <VocalProfileList
              isMe={isMe}
              portfolioData={portfolioData}
              audio={audio}
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              duration={duration}
              getDuration={getDuration}
              infiniteRef={targetRef}
            />
          )}
          <VocalProfileShadow />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>
      <PlayerWrapper></PlayerWrapper>

      {showPlayer && (
        <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} duration={duration} />
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
