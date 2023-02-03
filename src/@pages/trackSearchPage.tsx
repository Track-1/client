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
import { useState, useEffect, useRef, useCallback } from "react";

import { getTracksData } from "../core/api/trackSearch";
import { TracksDataType } from "../type/tracksDataType";

import { useQuery } from "react-query";
import { categorySelect } from "../recoil/categorySelect";
import axios from "axios";
import usePlayer from "../utils/hooks/usePlayer";
import { AudioInfosType } from "../type/audioTypes";

export default function TrackSearchPage() {
  const [tracksData, setTracksData] = useState<TracksDataType[]>([]);
  const [audioInfos, setAudioInfos] = useState({});

  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const { progress, audio, playAudio, pauseAudio } = usePlayer();

  //infinite scroll
  const targetRef = useRef<any>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const page = useRef<number>(1);

  useEffect(() => {
    setTracksData([]);
    page.current = 1;
  }, [filteredUrlApi]);

  const { data } = useQuery(["filteredUrlApi", filteredUrlApi, tracksData], () => getTracksData(filteredUrlApi), {
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (data) => {
      if (data?.status === 200 && page.current === 2) {
        setTracksData(data?.data.data.trackList);
      }
    },
    onError: (error) => {},
  });

  const fetch = useCallback(async (filteredUrlApi: string) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/tracks/filter?page=${page.current}&limit=6${filteredUrlApi}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
          },
        },
      );

      setTracksData((prev) => [...prev, ...data?.data?.trackList]);
      setHasNextPage(data?.data.trackList.length === 6);
      if (data?.data.trackList.length) {
        page.current += 1;
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        console.log("5", filteredUrlApi);

        fetch(filteredUrlApi);
      }
    });
    io.observe(targetRef.current);

    return () => {
      io.disconnect();
    };
  }, [fetch, hasNextPage, filteredUrlApi]);
  //infite scroll end

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
            <TrackList audio={audio} pauseAudio={pauseAudio} tracksData={tracksData} getInfos={getInfos} />
          )}
        </TrackListWrapper>
      </TrackSearchPageWrapper>
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
      <InfiniteWrapper ref={targetRef}></InfiniteWrapper>
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
