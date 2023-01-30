import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../../recoil/player";

export default function usePlay(audio: any, data: any, pageCategory: string) {
  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerBar);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentFile, setCurrentFile] = useState<string>("");

  useEffect(() => {
    audio.play();
    setPlay(true);
  }, [currentFile]);

  useEffect(() => {
    switch (pageCategory) {
      case "tracks":
        setCurrentFile(data[clickedIndex]?.wavFile);
        audio.src = data[clickedIndex]?.wavFile;
        break;
      case "vocals":
        setCurrentFile(data[clickedIndex]?.vocalTitleFile);
        audio.src = data[clickedIndex]?.vocalTitleFile;
        break;
      case "profile":
        setCurrentFile(data[clickedIndex]?.beatWavFile);
        audio.src = data[clickedIndex]?.beatWavFile;
        break;
      case "comments":
        console.log(data);
        setCurrentFile(data[clickedIndex]?.vocalWavFile);
        audio.src = data[clickedIndex]?.vocalWavFile;
        break;
    }
  }, [clickedIndex]);

  function playAudio(currentIndex: number) {
    setShowPlayer(true);
    setPlay(true);

    clickedIndex === currentIndex ? audio.play() : setClickedIndex(currentIndex);
  }

  return { clickedIndex, setClickedIndex, playAudio };
}
