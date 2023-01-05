import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import TrackList from "../@components/trackSearch/trackList";
import Player from "../@components/@common/player";

import { showPlayerBar, playMusic, currentAudioTime } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue } from "recoil";
import { Category } from "../core/common/categoryHeader";
import { useState, useEffect, useMemo } from "react";

import ditto from "../assets/audio/ditto.mp3";

export default function TrackSearchPage() {
  const audio = useMemo(() => new Audio(ditto), [ditto]);

  const [progress, setProgress] = useState<number>(0);

  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [currentTime, setCurrentTime] = useRecoilState<number>(currentAudioTime);

  useEffect(() => {
    setWhom(Category.TRACKS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요
  }, []);

  function playAudio() {
    console.log("00", audio.currentTime);
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
  }, [audio]);

  function pauseAudio() {
    console.log(audio.currentTime);
    audio.pause();
    setPlay(false);
  }

  function goProgress() {
    const currentDuration = (audio.currentTime / audio.duration) * 100;

    setProgress(currentDuration);
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
          <TrackList audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} />
        </TrackListWrapper>
      </TrackSearchPageWrapper>
      {showPlayer && <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} />}
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
