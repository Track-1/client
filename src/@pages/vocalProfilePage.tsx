import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import { Category } from "../core/common/categoryHeader";
import { showPlayerBar, playMusic } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { useMemo, useState, useEffect } from "react";
import { getVocalProfile } from "../core/api/vocalProfile";
import { VocalPortfolioType, VocalProfileType } from "../type/vocalProfile";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";

export default function VocalProfilePage() {
  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [isMe, setIsMe] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<VocalProfileType>();
  const [portfolioData, setPortfolioData] = useState<VocalPortfolioType[]>();

  const audio = useMemo(() => new Audio(), []);

  const {state}=useLocation()

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);


  const { data } = useQuery("vocalProfile", ()=>getVocalProfile(state)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
      if (data?.status === 200) {
        console.log(data);
        console.log("성공");
        setIsMe(data?.data.data.isMe);
        setProfileData(data?.data.data.vocalProfile);
        setPortfolioData(data?.data.data.vocalPortfolio);  
      }    
    },
    onError: error => {
      console.log("실패");
    }
  });

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
    <>
      {visible && <TracksProfileUploadModalSection />}
      <VocalProfilePageWrapper>
        <VocalProfile>보컬프로필 부분넣어주세요</VocalProfile>

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
            />
          )}
          <VocalProfileShadow />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>
      <PlayerWrapper></PlayerWrapper>
      {showPlayer && (
        <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} duration={duration} />
      )}
    </>
  );
}

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
