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

  const audio = useMemo(() => new Audio(), []);
  // const [currentAudio, setCurrentAudio] = useRecoilState<AudioTypes>(audioState);

  const filteredUrlApi = useRecoilValue(categorySelect);
  const pageNum = useRecoilValue(trackListinfiniteScroll);

  useEffect(() => {
    console.log(filteredUrlApi);
  }, [filteredUrlApi]);

  // const { isLoading, isError, data, error } = useQuery(["filteredUrlApi", filteredUrlApi, pageNum], () =>
  //   getTracksData(filteredUrlApi, pageNum),
  // );
  const { isLoading, isError, data, error } = useQuery(["filteredUrlApi", pageNum], () =>
  getTracksData(pageNum),
);


  // , {
  //   refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
  //   retry: 0, // 실패시 재호출 몇번 할지
  //   onSuccess: data => {
  //     // 성공시 호출
  //     if (data?.status === 200) {
  //       console.log(data);
  //       setTracksData(data?.data);
  //     }
  //   },
  //   onError: error => {
  //     // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
  //     // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
  //     console.log(error.message);
  //   }
  // });

  // if (isLoading) {
  //   return <span>Loading...</span>;
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>;
  // }

  // console.log(data?.data.data.trackList)

  useEffect(() => {
    setWhom(Category.TRACKS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요

    // async function getData() {
    //   const data = await getTracksData();
    //   setTracksData(data?.data);
    // }

    // getData();
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
              tracksData={data?.data.data.trackList}
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
