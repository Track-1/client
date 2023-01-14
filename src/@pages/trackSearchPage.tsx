import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import TrackList from "../@components/trackSearch/trackList";
import Player from "../@components/@common/player";

import { showPlayerBar, playMusic, audioFile } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Category } from "../core/common/categoryHeader";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

import ditto from "../assets/audio/ditto.mp3";
import { AudioTypes } from "../type/audioTypes";
import { getTracksData } from "../core/api/trackSearch";
import { TracksDataType } from "../type/tracksDataType";

import { useQuery, useInfiniteQuery } from "react-query";
import { categorySelect } from "../recoil/categorySelect";
import axios from "axios";
import { trackListinfiniteScroll } from "../recoil/infiniteScroll";
import { TracksData } from "../recoil/categorySelect";

export default function TrackSearchPage() {
  const [progress, setProgress] = useState<number>(0);

  // const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [currentFile, setCurrentFile] = useRecoilState<string>(audioFile);
  const [tracksData, setTracksData] = useState<TracksDataType[]>([]);
  const [duration, setCurrentDuration] = useState<number>(0);
  const audio = useMemo(() => new Audio(), []);
  const filteredUrlApi = useRecoilValue(categorySelect);
  const [title, setTitle] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

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

  useEffect(() => {
    setWhom(Category.TRACKS);
    setShowPlayer(false);
  }, []);

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  // useEffect(() => {
  //   console.log(showPlayer, play);
  //   console.log(duration);
  // }, [showPlayer]);

  useEffect(() => {
    if (play) {
      audio.addEventListener("timeupdate", () => {
        goProgress();
      });
    } else {
      audio.removeEventListener("timeupdate", () => {
        goProgress();
      });
    }
  }, [play]);

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function goProgress() {
    if (audio.duration) {
      const currentDuration = (audio.currentTime / audio.duration) * 100;
      setProgress(currentDuration);
      checkAudioQuit();
    }
  }

  function checkAudioQuit() {
    audio.duration === audio.currentTime && setPlay(false);
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
              duration={duration}
              getDuration={getDuration}
              getAudioInfos={getAudioInfos}
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
