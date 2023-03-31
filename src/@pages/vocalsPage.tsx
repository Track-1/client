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
import { useEffect, useState } from "react";
import { getVocalsData } from "../core/api/vocalSearch";
import { playMusic } from "../recoil/player";
import { categorySelect, trackSearching } from "../recoil/categorySelect";
import { useInfiniteQuery } from "react-query";
import { VocalsDataType } from "../type/vocalsDataType";
import usePlayer from "../utils/hooks/usePlayer";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import useInfiniteKey from "../utils/hooks/useInfiniteKey";

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
  const { key, excuteGetData } = useInfiniteKey();

  useEffect(() => {
    setWhom(Category.VOCALS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요
  }, []);

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    key,
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response.length !== 0 ? lastPage?.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getVocalsData(filteredUrlApi, isSelected, page);
      setVocalsData((prev) => [...prev, ...response]);
      return { response, nextPage: page + 1 };
    }
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
    <>
      <CategoryHeader />
      <VocalSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList />
        </CategoryListWrapper>

        <VocalListWrapper>
          <VocalListHeader />
          {data && <VocalList vocalData={vocalsData} audio={audio} getAudioInfos={getAudioInfos} />}
          <InfiniteWrapper ref={observerRef}></InfiniteWrapper>
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
