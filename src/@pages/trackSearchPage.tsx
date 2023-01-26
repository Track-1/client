import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import TrackList from "../@components/trackSearch/trackList";
import Player from "../@components/@common/player";

import { showPlayerBar, audioFile } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue } from "recoil";
import { Category } from "../core/constants/categoryHeader";
import { useState, useEffect, useRef, useCallback } from "react";

import { getTracksData } from "../core/api/trackSearch";
import { TracksDataType } from "../type/tracksDataType";

import { useQuery } from "react-query";
import { categorySelect } from "../recoil/categorySelect";
import axios from "axios";
import usePlay from "../utils/hooks/usePlay";

export default function TrackSearchPage() {
  const [tracksData, setTracksData] = useState<TracksDataType[]>([]);
  const [duration, setCurrentDuration] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");

  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const { play, setPlay, progress, setProgress, audio } = usePlay();

  //infinite scroll
  const targetRef = useRef<any>();
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [image, setImage] = useState<string>("");
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

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  function getAudioInfos(title: string, name: string, image: string) {
    setTitle(title);
    setName(name);
    setImage(image);
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
            <TrackList
              audio={audio}
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              tracksData={tracksData}
              getDuration={getDuration}
              getAudioInfos={getAudioInfos}
              play={play}
              setPlay={setPlay}
            />
          )}
        </TrackListWrapper>
      </TrackSearchPageWrapper>
      {showPlayer && (
        <Player
          audio={audio}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
          progress={progress}
          duration={duration}
          title={title}
          name={name}
          image={image}
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
