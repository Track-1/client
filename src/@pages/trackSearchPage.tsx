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
import { useState, useEffect, useMemo } from "react";

import ditto from "../assets/audio/ditto.mp3";
import { AudioTypes } from "../type/audioTypes";
import { getTracksData } from "../core/api/trackSearch";
import { TracksDataType } from "../type/tracksDataType";

import { useQuery } from "react-query";
import { categorySelect } from "../recoil/categorySelect";
import { trackListinfiniteScroll } from "../recoil/infiniteScroll";

export default function TrackSearchPage() {
  const [progress, setProgress] = useState<number>(0);

  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [currentFile, setCurrentFile] = useRecoilState<string>(audioFile);
  const [tracksData, setTracksData] = useState<TracksDataType[]>();

  const [duration, setCurrentDuration] = useState<number>(0);

  //이전 데이터랑 합치는 useState
  const [trackData, setTrackData] = useState<any>([]);

  const audio = useMemo(() => new Audio(), []);
  // const [currentAudio, setCurrentAudio] = useRecoilState<AudioTypes>(audioState);

  const filteredUrlApi=useRecoilValue(categorySelect)
  
  useEffect(() => {
    console.log(filteredUrlApi)
  },[filteredUrlApi])

  const { data } = useQuery(["filteredUrlApi",filteredUrlApi],()=>getTracksData(filteredUrlApi)
  , {
    refetchOnWindowFocus: false, 
    retry: 0, 
    onSuccess: data => {
      if (data?.status === 200) {
        setTracksData(data?.data.data.trackList);
      }    
    },
    onError: error => {
      console.log("실패");
    }
  });

  useEffect(() => {
    setWhom(Category.TRACKS); 
  }, []);

  function playAudio() {
    audio.play();
    setPlay(true);
  }

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
      console.log(audio.currentTime, audio.duration);
      setProgress(currentDuration);
    }
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
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
          {data && (
            <TrackList
              audio={audio}
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              //tracksData={data?.data.data.trackList}
              tracksData={trackData}
              duration={duration}
              getDuration={getDuration}
            />
          )}
        </TrackListWrapper>
      </TrackSearchPageWrapper>
      {showPlayer && (
        <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} duration={duration} />
      )}
    </>
  );
}

const TrackSearchPageWrapper = styled.section`
  display: flex;
`;

const CategoryListWrapper = styled.article`
  width: 32.1rem;
`;

const TrackListWrapper = styled.article`
  width: 159.9rem;
`;
