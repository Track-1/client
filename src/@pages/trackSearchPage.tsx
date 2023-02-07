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

export default function TrackSearchPage() {
  const [tracksData, setTracksData] = useState<TracksDataType[]>([]);
  const [audioInfos, setAudioInfos] = useState({});

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const { progress, audio, playPlayerAudio, pausesPlayerAudio } = usePlayer();

  async function getData(page: number) {
    if (hasNextPage !== false) {
      const response = await getTracksData(filteredUrlApi, page);
      setTracksData((prev) => [...prev, ...response]);
      return {
        response,
        nextPage: page + 1,
      };
    }
  }

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "trackSearch",
    ({ pageParam = 1 }) => getData(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.response.length !== 0 ? lastPage?.nextPage : undefined;
      },
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
      <CategoryHeader />
      <TrackSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList />
        </CategoryListWrapper>
        <TrackListWrapper>
          <TrackListHeader />
          {tracksData && (
            <TrackList audio={audio} pauseAudio={pausesPlayerAudio} tracksData={tracksData} getInfos={getInfos} />
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
