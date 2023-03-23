import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import ProducerPortFolioList from "../@components/producerProfile/producerPortFolioList";
import { ProducerPortfolioType, ProducerProfileType, SelectingTracksType } from "../type/producerProfile";
import producerGradientImg from "../assets/image/producerGradientImg.png";
import { RightArrorIc } from "../assets";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import Player from "../@components/@common/player";
import { playMusic, showPlayerBar } from "../recoil/player";
import { Outlet, useLocation } from "react-router-dom";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import usePlayer from "../utils/hooks/usePlayer";
import { useInfiniteQuery, useMutation } from "react-query";
import { getProducerPortfolio, getSelectingTracks, patchProducerProfile } from "../core/api/producerProfile";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import { LoginUserId } from "../recoil/loginUserData";

export default function ProducerProfilePage() {
  const { state } = useLocation();

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
  const loginUserId = useRecoilValue(LoginUserId);

  const { progress, audio } = usePlayer();
  /*
  async function getData(page: number) {
    //getData가 페이지가 딱 열렸을 때, 한 번만 탐. 스크롤 용도임.
    let response: any;
    if (hasNextPage !== false) {
      switch (profileState) {
        case "Portfolio":
          response = await getProducerPortfolio(state, page);
          console.log(response);

          break;
        case "Vocal Searching":
          response = await getSelectingTracks(state, page);
          console.log(response);

          break;
      }
      console.log(response);
      setIsMe(response?.isMe);
      setProfileData(response?.producerProfile);
      setPortfolioData((prev) => [...prev, ...response?.producerPortfolio]);
      console.log(setPortfolioData);
      // vocal searching을 클릭하면 beatList로 데이터가 받아들여지긴하는데... beatList에는 isMe와 producerProfile이 없어서 오류가 남.
   //   setSelectingTracksData((prev) => [...prev, ...response?.beatList]);
   //   console.log(setSelectingTracksData);
      //setPortfolioData((prev) => [...prev, ...response?.beatList]);

      //  setSelectingTracksData((prev) => [...prev, ...response?.beatList]);
      //  console.log(setSelectingTracksData);
      //setSelectingTracks도 있어야하지 않겠어..?
      return { response, nextPage: page + 1 };
    }
  }
*/
  async function getData(page: number) {
    //getData가 페이지가 딱 열렸을 때, 한 번만 탐. 스크롤 용도임.
    let response: any;
    if (hasNextPage !== false) {
      response = await getProducerPortfolio(state, page);

      setIsMe(response?.isMe);
      setProfileData(response?.producerProfile);

      switch (profileState) {
        case "Portfolio":
          setPortfolioData((prev) => [...prev, ...response?.producerPortfolio]);
          console.log(response);
          console.log(setPortfolioData);
          break;
        case "Vocal Searching":
          setSelectingTracksData((prev) => [...prev, ...response?.beatList]);
          console.log(response);
          console.log(setSelectingTracksData);
          break;
      }
      console.log(response);

      // vocal searching을 클릭하면 beatList로 데이터가 받아들여지긴하는데... beatList에는 isMe와 producerProfile이 없어서 오류가 남.
      //   setSelectingTracksData((prev) => [...prev, ...response?.beatList]);
      //   console.log(setSelectingTracksData);
      //setPortfolioData((prev) => [...prev, ...response?.beatList]);

      //  setSelectingTracksData((prev) => [...prev, ...response?.beatList]);
      //  console.log(setSelectingTracksData);
      //setSelectingTracks도 있어야하지 않겠어..?
      return { response, nextPage: page + 1 };
    }
  }

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "vocalPortFolio",
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response.producerPortfolio.length !== 0 ? lastPage?.nextPage : undefined;
      },
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

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
    setStateChange((prev) => !prev);
  }

  function changeToVocalSearch() {
    setProfileState("Vocal Searching");
    setStateChange((prev) => !prev);
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
      {profileData && <ProducerInfos profileData={profileData} />}
      <PageContainer>
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
        {portfolioData &&
          profileData &&
          (profileState === "Portfolio" ? (
            <ProducerPortFolioList
              isMe={isMe}
              portfolioData={portfolioData}
              profileState={profileState}
              stateChange={stateChange}
              audio={audio}
              pauseAudio={pauseAudio}
              getAudioInfos={getAudioInfos}
              producerName={profileData?.name}
            />
          ) : (
            <ProducerPortFolioList
              isMe={isMe}
              portfolioData={selectingTracksData}
              profileState={profileState}
              stateChange={stateChange}
              audio={audio}
              pauseAudio={pauseAudio}
              getAudioInfos={getAudioInfos}
              producerName={profileData?.name}
            />
          ))}
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
