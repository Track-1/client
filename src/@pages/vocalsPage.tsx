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
import { categorySelect, trackSearching } from "../recoil/categorySelect";
import { useQuery } from "react-query";
import { VocalsDataType } from "../type/vocalsDataType";
import usePlay from "../utils/hooks/usePlay";

export default function VocalsPage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const isSelected = useRecoilValue(trackSearching);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const [vocalsData, setVocalsData] = useState<VocalsDataType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [duration, setCurrentDuration] = useState<number>(0);

  const { play, setPlay, progress, setProgress, audio } = usePlay();

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
        // if (data?.status === 200&&page.current===2) {
        if (data?.status === 200) {
          setVocalsData(data?.data.data.vocalList);
        }
      },
      onError: (error) => {
        console.log("실패");
      },
    },
  );

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);

  function playAudio() {
    audio.play();
    setPlay(true);
    setShowPlayer(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  function getDuration(durationTime: number) {
    setCurrentDuration(durationTime);
  }

  function getAudioInfos(title: string, image: string) {
    setTitle(title);
    setImage(image);
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
          {data && (
            <VocalList
              vocalData={vocalsData}
              audio={audio}
              getDuration={getDuration}
              getAudioInfos={getAudioInfos}
              play={play}
              setPlay={setPlay}
            />
          )}
          <InfiniteWrapper ref={targetRef}></InfiniteWrapper>
        </VocalListWrapper>
      </VocalSearchPageWrapper>
      {showPlayer && vocalsData && (
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
