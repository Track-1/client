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
import { useEffect, useState, useMemo, useRef } from "react";
import { getVocalsData } from "../core/api/vocalSearch";
import { playMusic } from "../recoil/player";
import { categorySelect, trackSearching } from "../recoil/categorySelect";
import { vocalListinfiniteScroll } from "../recoil/infiniteScroll";
import { useQuery } from "react-query";
import { VocalsDataType } from "../type/vocalsDataType";
import usePlay from "../utils/hooks/usePlay";

export default function VocalsPage() {
  const [whom, setWhom] = useRecoilState(tracksOrVocalsCheck);
  // const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const isSelected = useRecoilValue(trackSearching);
  const filteredUrlApi = useRecoilValue(categorySelect);

  const [vocalsData, setVocalsData] = useState<VocalsDataType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  // const [progress, setProgress] = useState<number>(0);
  const [duration, setCurrentDuration] = useState<number>(0);

  // const audio = useMemo(() => new Audio(), []);

  const { play, setPlay, progress, setProgress, audio } = usePlay();

  useEffect(() => {
    setWhom(Category.VOCALS); // 나중에 헤더에서 클릭했을 때도 변경되도록 구현해야겠어요
  }, []);

  // const { isIntersect } = useIntersectObserver(intersectRef, {
  //   rootMargin: "200px",
  //   threshold: 0.05,
  // });

  // const loadMoreCommentData = async () => {
  //   if (isIntersect) {
  //     const data = await getVocalsData(filteredUrlApi, isSelected, page);
  //     setVocalList((prev: any) => prev && [...prev, ...data?.data.data.vocalList]);
  //     setPage((prev) => prev + 1);
  //   }
  // };

  // useEffect(() => {
  //   loadMoreCommentData();
  // }, [isIntersect, isLastPage]);

  // const { data } = useQuery(
  //   ["changeVocal", filteredUrlApi, isSelected, pageNum],
  //   () => getVocalsData(filteredUrlApi, isSelected, pageNum),
  //   {
  //     refetchOnWindowFocus: false,
  //     retry: 0,
  //     onSuccess: (data) => {
  //       if (data?.status === 200) {
  //       }
  //     },
  //     onError: (error) => {},
  //   },
  // );

  const targetRef = useRef<any>();

  // useEffect(()=>{
  //   console.log("데이터",vocalsData)
  //   console.log("페이지",page.current)
  // },[vocalsData])

  // useEffect(()=>{
  //   setVocalsData([])
  //   page.current=1
  // },[filteredUrlApi])

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

  // const fetch = useCallback(async (filteredUrlApi: string) => {
  //   try {
  //     const { data } = await axios.get(
  //     `${process.env.REACT_APP_BASE_URL}/vocals/filter?page=${page.current}&limit=8${filteredUrlApi}&isSelected=${isSelected}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
  //         },
  //       },
  //     );
  //     setHasNextPage(data?.data.vocalList.length === 8);

  //     setVocalsData(prev=>[...prev, ...data?.data?.vocalList]);

  //     if (data?.data.vocalList.length) {
  //       page.current += 1;
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log("4",filteredUrlApi)

  //   const io = new IntersectionObserver((entries, observer) => {
  //     console.log(entries[0].isIntersecting)
  //     if (entries[0].isIntersecting) {
  //       console.log("5",filteredUrlApi)
  //       fetch(filteredUrlApi);
  //     }
  //   });
  //   io.observe(targetRef.current);

  //   return () => {
  //     io.disconnect();
  //   };
  // }, [fetch, hasNextPage,filteredUrlApi]);

  useEffect(() => {
    setWhom(Category.VOCALS);
  }, []);

  //end

  function playAudio() {
    audio.play();
    setPlay(true);
    setShowPlayer(true);
  }

  function pauseAudio() {
    audio.pause();
    setPlay(false);
  }

  // useEffect(() => {
  //   if (play) {
  //     audio.addEventListener("timeupdate", () => {
  //       goProgress();
  //     });
  //   } else {
  //     audio.removeEventListener("timeupdate", () => {
  //       goProgress();
  //     });
  //   }
  // }, [play]);

  // function goProgress() {
  //   if (audio.duration) {
  //     const currentDuration = (audio.currentTime / audio.duration) * 100;
  //     setProgress(currentDuration);
  //   }
  // }

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
