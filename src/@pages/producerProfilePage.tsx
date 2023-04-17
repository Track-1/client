import styled from "styled-components";
import { useEffect, useState } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { ProducerPortfolioType, ProducerProfileType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import ProducerEmptyProfileImg from "../assets/image/producerEmptyProfileImg.png";
import { RightArrorIc, UploadButtonBlankIc, UploadButtonIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import { useRecoilValue, useRecoilState } from "recoil";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import Player from "../@components/@common/player";
import { playMusic, showPlayerBar } from "../recoil/player";
import { Outlet, useLocation, useParams } from "react-router-dom";
import usePlayer from "../utils/hooks/usePlayer";
import { useInfiniteQuery } from "react-query";
import { getProducerPortfolio, getSelectingTracks, patchProducerProfile } from "../core/api/producerProfile";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import { Category } from "../core/constants/categoryHeader";
import useInfiniteKey from "../utils/hooks/useInfiniteKey";
import { endPost } from "../recoil/postIsCompleted";
import Loading from "../@components/@common/loading";
import { reload } from "../recoil/main";

export default function ProducerProfilePage() {
  // const { state } = useLocation();
  const state = Number(useParams().producerId);

  const { key, excuteGetData } = useInfiniteKey();

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
  const [isEnd, setIsEnd] = useRecoilState(endPost);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [openUploadModal, setOpenUploadModal] = useRecoilState<boolean>(uploadButtonClicked);
  const [saveResponse, setSaveResponse] = useState<any>();
  const [isReload, setIsReload] = useRecoilState<boolean>(reload);

  const { progress, audio, pausesPlayerAudio, closePlayer } = usePlayer();
  const [lastClickTime, setLastClickTime] = useState(0);

  window.onpopstate = function (event) {
    !isReload && window.history.back();
    pausesPlayerAudio();
    closePlayer();
    setIsReload(true);
  };

  function isDataEmpty() {
    return profileState === "Portfolio" ? portfolioData.length === 0 : selectingTracksData.length === 0;
  }

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    [key, isEnd],

    ({ pageParam = 1 }) => getData(pageParam, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (profileState === "Portfolio") {
          return lastPage?.portfolioNextPage;
        } else {
          return lastPage?.selectingNextPage;
        }
      },
      refetchOnWindowFocus: false,
      retry: 0,
      onError: (error) => {
        console.log(error);
      },
    },
  );


  async function getData(portfolioPage: number, selectingPage: number) {
    const currentTime = new Date().getTime();
    let portfolioResponse: any;
    let selectingResponse: any;
    setOpenUploadModal(false);
    console.log(selectingPage);
    
    if (currentTime - lastClickTime < 500) {
      return;
    } else if (hasNextPage !== false) {
      setLastClickTime(currentTime);

      portfolioResponse = await getProducerPortfolio(state, portfolioPage);
      selectingResponse = await getSelectingTracks(state, selectingPage);

      setIsMe(portfolioResponse?.isMe);
      setProfileData(portfolioResponse?.producerProfile);
      switch (profileState) {
        case "Portfolio":
          isEnd
            ? setPortfolioData((prev) => [])
            : setPortfolioData((prev) => [...prev, ...portfolioResponse?.producerPortfolio]);
          setSaveResponse(portfolioResponse);

          return { portfolioResponse, selectingResponse, portfolioNextPage: portfolioPage + 1, selectingNextPage: 1 };
        case "Vocal Searching":
          console.log(selectingResponse);
          isEnd
            ? setSelectingTracksData((prev) => [])
            : setSelectingTracksData((prev) => [...prev, ...selectingResponse?.beatList]);
          setSaveResponse(selectingResponse);

          return { portfolioResponse, selectingResponse, portfolioNextPage: 1, selectingNextPage: selectingPage + 1 };
      }
    }
  }

  useEffect(() => {
    setIsEnd(false);
  }, [saveResponse]);

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  function scrollToTop() {
    window.scrollTo(0, 0);
  }

  function changeToProfile() {
    pauseAudio();
    setShowPlayer(false);
    setProfileState("Portfolio");
    setStateChange(!stateChange);
    setSelectingTracksData([]);
  }

  function changeToVocalSearch() {
    pauseAudio();
    setShowPlayer(false);

    setProfileState("Vocal Searching");
    setStateChange(!stateChange);
    setPortfolioData([]);
  }

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;

    setAudioInfos(tempInfos);
  }

  function moveToUpload() {
    setOpenUploadModal(true);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Outlet />
      {visible && <TracksProfileUploadModal />}
      {isMe && <UploadButtonIcon onClick={moveToUpload} />}

      {profileData && (
        <ProducerInfos
          profileData={profileData}
          isMe={isMe}
          whom={Category.TRACKS}
          whoamI={"producer"}
          pauseAudio={pauseAudio}
          changeKey={excuteGetData}
        />
      )}
      <PageContainer>
        <GradientBox src={producerGradientImg} />
        <TabContainer>
          <PortfolioTab
            profileState={profileState}
            onClick={() => {
              changeToProfile();
              scrollToTop();
              setPortfolioData([]);
              excuteGetData();
              setShowPlayer(false);
            }}>
            {profileState === "Portfolio" ? <RightArrorIcon /> : <BlankDiv />}
            Portfolio
          </PortfolioTab>
          <VocalSearchingTab
            profileState={profileState}
            onClick={() => {
              changeToVocalSearch();
              scrollToTop();
              setSelectingTracksData([]);
              excuteGetData();
              setShowPlayer(false);
            }}>
            {profileState === "Vocal Searching" ? <RightArrorIcon /> : <BlankDiv />}
            Vocal Searching
          </VocalSearchingTab>
        </TabContainer>

        {!isDataEmpty() && profileData ? (
          <ProducerPortFolioList
            isMe={isMe}
            portfolioData={profileState === "Portfolio" ? portfolioData : selectingTracksData}
            profileState={profileState}
            stateChange={stateChange}
            audio={audio}
            pauseAudio={pauseAudio}
            getAudioInfos={getAudioInfos}
            producerName={profileData?.name}
            whom={Category.TRACKS}
            changeKey={excuteGetData}
            setPortfolioData={setPortfolioData}
          />
        ) : (
          <ProducerEmptyProfileImage src={ProducerEmptyProfileImg} />
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

const ProducerEmptyProfileImage = styled.img`
  position: absolute;
  top: 26.2rem;
  left: 69.6rem;
  width: 124.2rem;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: fixed;
  z-index: 7;
  right: 0;
  margin-top: 5.9rem;
  margin-right: 6.9rem;

  width: 24.5rem;

  cursor: pointer;
`;
