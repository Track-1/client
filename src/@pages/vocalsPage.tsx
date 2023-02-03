import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import VocalListHeader from "../@components/vocalSearch/vocalListHeader";
import VocalList from "../@components/vocalSearch/vocalList";
import Player from "../@components/@common/player";

import { Category } from "../core/constants/categoryHeader";
import { showPlayerBar } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState, useRef } from "react";
import { getVocalsData } from "../core/api/vocalSearch";
import { playMusic } from "../recoil/player";
import { categorySelect, trackSearching } from "../recoil/categorySelect";
import { useQuery } from "react-query";
import { VocalsDataType } from "../type/vocalsDataType";
import usePlayer from "../utils/hooks/usePlayer";

export default function VocalsPage() {
  const [vocalsData, setVocalsData] = useState<VocalsDataType[]>([]);
  const [audioInfos, setAudioInfos] = useState({
    title: "",
    name: "",
    progress: "",
    duration: 0,
    image: "",
  });

  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const isSelected = useRecoilValue(trackSearching);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const { progress, audio } = usePlayer();

  useEffect(() => {
    setWhom(Category.VOCALS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요
  }, []);

  const targetRef = useRef<any>();

  const { data } = useQuery(
    ["filteredUrlApi", filteredUrlApi, isSelected, vocalsData],
    () => getVocalsData(filteredUrlApi, isSelected),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        if (data?.status === 200) {
          setVocalsData(data?.data.data.vocalList);
        }
      },
      onError: (error) => {
        console.log("실패");
      },
    },
  );

  //end

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
    <>
      <CategoryHeader />
      <VocalSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList />
        </CategoryListWrapper>

        <VocalListWrapper>
          <VocalListHeader />
          {data && <VocalList vocalData={vocalsData} audio={audio} getAudioInfos={getAudioInfos} />}
          <InfiniteWrapper ref={targetRef}></InfiniteWrapper>
        </VocalListWrapper>
      </VocalSearchPageWrapper>
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
    </>
  );
}

const VocalSearchPageWrapper = styled.div`
  display: flex;
`;
const CategoryListWrapper = styled.div`
  width: 32.1rem;
`;
const VocalListWrapper = styled.div`
  width: 159.9rem;
`;

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;
`;
