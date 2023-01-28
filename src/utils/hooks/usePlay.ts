import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../../recoil/player";

export default function usePlay(audio: any, data: any) {
  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerBar);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentFile, setCurrentFile] = useState<string>("");

  useEffect(() => {
    audio.play();
    setPlay(true);
  }, [currentFile]);

  useEffect(() => {
    setCurrentFile(data[clickedIndex]?.wavFile);
    audio.src = data[clickedIndex]?.wavFile;
  }, [clickedIndex]);

  function playAudio(currentIndex: number) {
    setShowPlayer(true);
    setPlay(true);

    clickedIndex === currentIndex ? audio.play() : setClickedIndex(currentIndex);
  }

  return { clickedIndex, playAudio };
}
