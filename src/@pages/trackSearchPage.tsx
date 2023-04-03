import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import TrackList from "../@components/trackSearch/trackList";
import Player from "../@components/@common/player";

import { showPlayerBar, playMusic } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue } from "recoil";
import { Category } from "../core/constants/categoryHeader";
import { useState, useEffect } from "react";

import { getTracksData } from "../core/api/trackSearch";
import { TracksDataType } from "../type/tracksDataType";

import { useInfiniteQuery } from "react-query";
import { categorySelect } from "../recoil/categorySelect";
import usePlayer from "../utils/hooks/usePlayer";
import { AudioInfosType } from "../type/audioTypes";
import useInfiniteScroll from "../utils/hooks/useInfiniteScroll";
import useInfiniteKey from "../utils/hooks/useInfiniteKey";

export default function TrackSearchPage() {
  const [tracksData, setTracksData] = useState<TracksDataType[]>([]);
  const { key, excuteGetData } = useInfiniteKey();

  const [audioInfos, setAudioInfos] = useState({});

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const filteredUrlApi = useRecoilValue(categorySelect);
  const [categoryChanged, setCategoryChanged] = useState<boolean>(false);
  const [pageParam, setPageParam] = useState<number>(1);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();

  async function getData(page: number) {
    console.log("2단계");
    if (hasNextPage !== false) {
      const response = await getTracksData(filteredUrlApi, page);
      setTracksData((prev) => [...prev, ...response]);
      return {
        response,
        nextPage: page + 1,
      };
    }
  }
  console.log(filteredUrlApi);
  console.log(tracksData);
  //console.log()
  /*   useEffect(() => {
    tracksData !== [] && setTracksData([]);
    setCategoryChanged(!categoryChanged);
    setPageParam(1);
    console.log("1단계");
    //  pageParam=1
  }, [filteredUrlApi]); */

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [key, categoryChanged],
    ({ pageParam = 1 }) => getData(pageParam), //다음 스크롤로 정보를 받아옴
    {
      getNextPageParam: (lastPage, allPages) => {
        //console.log(key);
        // console.log(lastPage)

        console.log("3단계");

        return lastPage?.response.length !== 0 ? lastPage?.nextPage : undefined;
      },
      refetchOnWindowFocus: false,
    },
  );

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  useEffect(() => {
    setWhom(Category.TRACKS);
    setShowPlayer(false);
  }, []);

  function getInfos(currentInfos: AudioInfosType) {
    setAudioInfos(currentInfos);
  }

  return (
    <>
      <CategoryHeader excuteGetData={excuteGetData} pausesPlayerAudio={pausesPlayerAudio} />
      <TrackSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList pausesPlayerAudio={pausesPlayerAudio} excuteGetData={excuteGetData}/>
        </CategoryListWrapper>
        <TrackListWrapper>
          <TrackListHeader />
          {tracksData && (
            <TrackList
              audio={audio}
              pauseAudio={pausesPlayerAudio}
              tracksData={tracksData}
              getInfos={getInfos}
              excuteGetData={excuteGetData}
            />
          )}
        </TrackListWrapper>
      </TrackSearchPageWrapper>
      {showPlayer && (
        <Player
          audio={audio}
          playAudio={playPlayerAudio}
          pauseAudio={pausesPlayerAudio}
          progress={progress}
          audioInfos={audioInfos}
          play={play}
          setPlay={setPlay}
        />
      )}
      <InfiniteWrapper ref={observerRef}></InfiniteWrapper>
    </>
  );
}

const InfiniteWrapper = styled.div`
  width: 100%;
  height: 2rem;

  color: pink;
`;

const TrackSearchPageWrapper = styled.section`
  display: flex;
`;

const CategoryListWrapper = styled.article`
  width: 32.1rem;
`;

const TrackListWrapper = styled.article`
  width: 159.9rem;
`;
