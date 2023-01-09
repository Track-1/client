import styled from "styled-components";
import { useEffect, useState, useMemo } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { getProducerProfile, getSelectingTracks } from "../core/api/producerProfile";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import { useRecoilValue, useRecoilState } from "recoil";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import Player from "../@components/@common/player";
import { playMusic, showPlayerBar } from "../recoil/player";

export default function ProducerProfilePage() {
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>();
  const [profileState, setProfileState] = useState<string>("Portfolio");
  const [isMe, setIsMe] = useState<boolean>(false);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const visible = useRecoilValue(uploadButtonClicked);

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const audio = useMemo(() => new Audio(), []);

  useEffect(() => {
    async function getData() {
      const data = await getProducerProfile();

      setPortfolioData(data?.data[0].producerPortfolio);
      setProfileData(data?.data[0].producerProfile);
      setIsMe(data?.data[0].isMe);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      profileState === "Portfolio" ? await getProfileData() : await getVocalSearchData();
    }
    getData();
  }, [profileState]);

  function playAudio() {
    audio.play();
    setPlay(true);

    console.log(play);
  }

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

  function changeToProfile() {
    setProfileState("Portfolio");
    setStateChange((prev) => !prev);
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");
    setStateChange((prev) => !prev);
  }

  async function getVocalSearchData() {
    const data = await getSelectingTracks();
    setPortfolioData(data?.data);
  }

  async function getProfileData() {
    const data = await getProducerProfile();
    setPortfolioData(data?.data[0].producerPortfolio);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  return (
    <>
      <PageContainer>
        {visible && <TracksProfileUploadModal />}
        {profileData && <ProducerInfos profileData={profileData} />}
        <GradientBox src={producerGradientImg} />
        <TabContainer>
          <PortfolioTab profileState={profileState} onClick={changeToProfile}>
            {profileState === "Portfolio" ? <RightArrorIcon /> : <BlankDiv />}
            Portfolio
          </PortfolioTab>
          <VocalSearchingTab profileState={profileState} onClick={changeToVocalSearch}>
            {profileState === "Vocal Searching" ? <RightArrorIcon /> : <BlankDiv />}
            Vocal Searching
          </VocalSearchingTab>
        </TabContainer>
        {portfolioData && (
          <ProducerPortFolioList
            isMe={isMe}
            portfolioData={portfolioData}
            profileState={profileState}
            stateChange={stateChange}
            audio={audio}
            playAudio={playAudio}
            pauseAudio={pauseAudio}
            duration={duration}
            getDuration={getDuration}
          />
        )}
      </PageContainer>
      {showPlayer && (
        <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} duration={duration} />
      )}
    </>
  );
}

const PageContainer = styled.section`
  display: flex;
`;

const GradientBox = styled.img`
  left: 60rem;
`;

const TabContainer = styled.ul`
  position: fixed;
  top: 6rem;
  left: 63.8rem;

  ${({ theme }) => theme.fonts.body1};
`;

const PortfolioTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Portfolio" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const VocalSearchingTab = styled.li<{ profileState: string }>`
  height: 4rem;

  color: ${({ theme, profileState }) => (profileState === "Vocal Searching" ? theme.colors.white : theme.colors.gray3)};

  display: flex;
`;

const BlankDiv = styled.div`
  width: 3.5rem;
`;

const RightArrorIcon = styled(RightArrorIc)`
  margin-right: 1rem;
`;
