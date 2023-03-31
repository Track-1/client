import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import Player from "../@components/@common/player";
import TracksProfileUploadModal from "../@components/@common/tracksProfileUploadModal";
import VocalProfileList from "../@components/vocalProfile/vocalProfileList";
import VocalProfileShadow from "../@components/vocalProfile/vocalProfileShadow";
import VocalEmptyProfileImg from "../assets/image/vocalEmptyProfileImg.png";
import { Category } from "../core/constants/categoryHeader";
import { playMusic, showPlayerBar } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";
import { uploadButtonClicked } from "../recoil/uploadButtonClicked";
import { useState, useEffect } from "react";
import { getVocalProfile } from "../core/api/vocalProfile";
import { VocalPortfolioType, VocalProfileType } from "../type/vocalProfile";
import { useInfiniteQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ProducerInfos from "../@components/producerProfile/producerInfos";
import usePlayer from "../utils/hooks/usePlayer";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import { LoginUserId } from "../recoil/loginUserData";
import { currentUser } from "../core/constants/userType";
import { endPost } from "../recoil/postIsCompleted";
import useInfiniteKey from "../utils/hooks/useInfiniteKey";

export default function VocalProfilePage() {
  const [isMe, setIsMe] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>();
  const [portfolioData, setPortfolioData] = useState<VocalPortfolioType[]>([]);
  const [audioInfos, setAudioInfos] = useState({
    title: "",
    name: "",
    progress: "",
    duration: 0,
    image: "",
  });

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [visible, setVisible] = useRecoilState<boolean>(uploadButtonClicked);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const loginUserId = useRecoilValue(LoginUserId);
  const [tracksOrVocals, setTracksOrVocals] = useRecoilState<any>(tracksOrVocalsCheck);
  const { key } = useInfiniteKey();
  const isEnd = useRecoilValue(endPost);
  const { progress, audio } = usePlayer();

  const { state } = useLocation();

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [key, isEnd],
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response?.vocalPortfolio.length % 6 == 0 ? lastPage?.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  useEffect(() => {
    // setWhom(Category.TRACKS);
    // setShowPlayer(false);
    setTracksOrVocals(currentUser.VOCAL);
  }, []);

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getVocalProfile(state, page);
      setIsMe(response?.isMe);
      setProfileData(response?.vocalProfile);
      setPortfolioData((prev) => [...prev, ...response?.vocalPortfolio]);
      return { response, nextPage: page + 1 };
    }
  }

  function isPortfolioDataEmpty() {
    return portfolioData.length === 0;
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

  return (
    <Wrap>
      {visible && <TracksProfileUploadModalSection />}
      <VocalProfile>
        {profileData && (
          <ProducerInfos profileData={profileData} isMe={isMe} whom={Category.VOCALS} pauseAudio={pauseAudio} />
        )}
      </VocalProfile>
      <VocalProfilePageWrapper>
        <VocalProfileWrapper>
          {!isPortfolioDataEmpty() && profileData ? (
            <VocalProfileList
              isMe={isMe}
              portfolioData={portfolioData}
              audio={audio}
              pauseAudio={pauseAudio}
              infiniteRef={observerRef}
              getAudioInfos={getAudioInfos}
              vocalName={profileData?.name}
              whom={Category.VOCALS}
            />
          ) : (
            <VocalEmptyProfileImage src={VocalEmptyProfileImg} />
          )}
          <VocalProfileShadowIcon />
        </VocalProfileWrapper>
      </VocalProfilePageWrapper>

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

const VocalProfileShadowIcon = styled(VocalProfileShadow)`
  width: 45rem;
`;

const VocalEmptyProfileImage = styled.img`
  position: absolute;
  top: 26.2rem;
  left: 69.6rem;
  width: 124.2rem;
`;

