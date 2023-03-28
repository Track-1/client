import styled from "styled-components";
import { useEffect, useState } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import { useRecoilValue, useRecoilState } from "recoil";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import Player from "../@components/@common/player";
import { playMusic, showPlayerBar } from "../recoil/player";
import { Outlet, useLocation } from "react-router-dom";
import usePlayer from "../utils/hooks/usePlayer";
import { useInfiniteQuery, useQuery } from "react-query";
import { getProducerPortfolio, getSelectingTracks, patchProducerProfile } from "../core/api/producerProfile";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";

export default function ProducerProfilePage() {
  const { state } = useLocation();
console.log(state)
  const [profileData, setProfileData] = useState<ProducerProfileType>();
  const [portfolioData, setPortfolioData] = useState<ProducerPortfolioType[]>([]);
  const [selectingTracksData, setSelectingTracksData] = useState<ProducerPortfolioType[]>([]);
  const [profileState, setProfileState] = useState<string>("Portfolio");
  const [isMe, setIsMe] = useState<boolean>(true);
  const [stateChange, setStateChange] = useState<boolean>(false);
  const [audioInfos, setAudioInfos] = useState({
    title: "",
    name: "",
    progress: "",
    duration: 0,
    image: "",
  });

  const visible = useRecoilValue(uploadButtonClicked);
  const showPlayer = useRecoilValue(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  const { progress, audio } = usePlayer();

  const data = useQuery("userProfile", () => getProducerPortfolio(state, 1), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      setIsMe(data?.isMe);
      setProfileData(data?.producerProfile);
      //  setPortfolioData([...data?.producerPortfolio]);
      //setSelectingTracksData([...data?.beatList]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  async function getProfileTypeApi() {
    //console.log(profileState);

    return await getProducerPortfolio(state, 1);
  }

  async function getData(portfolioPage: number, selectingPage: number) {
    let portfolioResponse: any;
    let selectingResponse: any;
    //console.log(profileState);
    //console.log(stateChange);
    if (hasNextPage !== false) {
      portfolioResponse = await getProducerPortfolio(state, portfolioPage);
      selectingResponse = await getSelectingTracks(state, selectingPage);

      setIsMe(portfolioResponse?.isMe);
      setProfileData(portfolioResponse?.producerProfile);

      switch (profileState) {
        case "Portfolio":
          setPortfolioData((prev) => [...prev, ...portfolioResponse?.producerPortfolio]);
          return { portfolioResponse, selectingResponse, portfolioNextPage: portfolioPage + 1, selectingNextPage: 1 };
        case "Vocal Searching":
          setSelectingTracksData((prev) => [...prev, ...selectingResponse?.beatList]);
          return { portfolioResponse, selectingResponse, portfolioNextPage: 1, selectingNextPage: selectingPage + 1 };
      }
    }
  }

  const { hasNextPage, fetchNextPage } = useInfiniteQuery(
    "producerPortFolio",
    ({ pageParam = 1 }) => getData(pageParam, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log(profileState);
        if (profileState === "Portfolio") {
          return lastPage?.portfolioResponse.producerPortfolio.length % 4 === 0
            ? lastPage?.portfolioNextPage
            : undefined;
        } else {
          return lastPage?.selectingResponse.beatList.length !== 0 ? lastPage?.selectingNextPage : undefined;
        }
      },
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  function ScrollToTop() {
    window.scrollTo(0, 0);
  }

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function changeToProfile() {
    setProfileState("Portfolio");
    setStateChange(!stateChange);
    setSelectingTracksData([]);
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");
    setStateChange(!stateChange);
    setPortfolioData([]);
  }

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
      <Outlet />
      {visible && <TracksProfileUploadModal />}
      {profileData && <ProducerInfos profileData={profileData} isMe={isMe}/>}
      <PageContainer>
        <GradientBox src={producerGradientImg} />
        <TabContainer>
          <PortfolioTab
            profileState={profileState}
            onClick={() => {
              changeToProfile();
              ScrollToTop();
            }}>
            {profileState === "Portfolio" ? <RightArrorIcon /> : <BlankDiv />}
            Portfolio
          </PortfolioTab>
          <VocalSearchingTab
            profileState={profileState}
            onClick={() => {
              changeToVocalSearch();
              ScrollToTop();
            }}>
            {profileState === "Vocal Searching" ? <RightArrorIcon /> : <BlankDiv />}
            Vocal Searching
          </VocalSearchingTab>
        </TabContainer>
        {portfolioData && profileData && (
          <ProducerPortFolioList
            isMe={isMe}
            portfolioData={profileState === "Portfolio" ? portfolioData : selectingTracksData}
            profileState={profileState}
            stateChange={stateChange}
            audio={audio}
            pauseAudio={pauseAudio}
            getAudioInfos={getAudioInfos}
            producerName={profileData?.name}
          />
        )}
      </PageContainer>
      <InfiniteDiv ref={observerRef}> </InfiniteDiv>

      {showPlayer && profileData && (
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
    </>
  );
}
// infinite
const InfiniteDiv = styled.div`
  width: 100%;
  height: 1rem;
`;

const PageContainer = styled.section`
  display: flex;

  margin-left: 61rem;
`;

const GradientBox = styled.img`
  width: 45rem;
  left: 60rem;
`;

const TabContainer = styled.ul`
  position: fixed;
  top: 6rem;
  left: 63.8rem;

  ${({ theme }) => theme.fonts.body1};
  cursor: pointer;
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
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 1rem;
`;
