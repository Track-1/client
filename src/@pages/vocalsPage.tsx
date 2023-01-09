import styled from "styled-components";

import CategoryHeader from "../@components/@common/categoryHeader";
import CategoryList from "../@components/@common/categoryList";
import VocalListHeader from "../@components/vocalSearch/vocalListHeader";
import VocalList from "../@components/vocalSearch/vocalList";
import Player from "../@components/@common/player";
import { VocalSearchType } from "../type/vocalSearchType";

import { Category } from "../core/common/categoryHeader";
import { showPlayerBar } from "../recoil/player";
import { tracksOrVocalsCheck } from "../recoil/tracksOrVocalsCheck";

import { useRecoilState, useRecoilValue } from "recoil";
import TrackListHeader from "../@components/trackSearch/trackListHeader";
import { useEffect, useState, useMemo } from "react";
import { getVocalsData } from "../core/api/vocalSearch";
import { playMusic } from "../recoil/player";

export default function VocalsPage() {
  const showPlayer = useRecoilValue<boolean>(showPlayerBar);
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [vocalData, setVocalData] = useState<VocalSearchType[]>();
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);

  const audio = useMemo(() => new Audio(), []);

  useEffect(() => {
    setWhom(Category.VOCALS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요

    async function getData() {
      const data = await getVocalsData();
      console.log(data?.data);
      setVocalData(data?.data);
    }

    getData();
  }, []);

  function playAudio() {
    audio.play();
    setPlay(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
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
      <VocalSearchPageWrapper>
        <CategoryListWrapper>
          <CategoryList />
        </CategoryListWrapper>

        <VocalListWrapper>
          <VocalListHeader />
          {vocalData && (
            <VocalList
              vocalData={vocalData}
              audio={audio}
              playAudio={playAudio}
              pauseAudio={pauseAudio}
              duration={duration}
              getDuration={getDuration}
            />
          )}
        </VocalListWrapper>
      </VocalSearchPageWrapper>
      {showPlayer && (
        <Player audio={audio} playAudio={playAudio} pauseAudio={pauseAudio} progress={progress} duration={duration} />
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
