import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../../recoil/player";
import { AudioInfosType } from "../../type/audioTypes";
import { ProducerPortfolioType } from "../../type/producerProfile";
import { TracksDataType } from "../../type/tracksDataType";
import { VocalPortfolioType } from "../../type/vocalProfile";
import { VocalsDataType } from "../../type/vocalsDataType";

export default function usePlay(audio: HTMLAudioElement, data: any, pageCategory: string) {
  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState(showPlayerBar);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [audioInfos, setAudioInfos] = useState<AudioInfosType>({
    title: "",
    name: "",
    progress: 0,
    duration: 0,
    image: "",
  });

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

  function getAudioInfos(title: string, name: string, image: string, duration: number) {
    const tempInfos = audioInfos;
    tempInfos.title = title;
    tempInfos.name = name;
    tempInfos.image = image;
    tempInfos.duration = duration;
    setAudioInfos(tempInfos);
  }

  useEffect(() => {
    switch (pageCategory) {
      case "tracks":
        getAudioInfos(
          data[clickedIndex]?.title,
          data[clickedIndex]?.producerName,
          data[clickedIndex]?.jacketImage,
          data[clickedIndex]?.wavFileLength,
        );
        break;
      case "vocals":
        getAudioInfos(
          "이색기들아 제목이없다.",
          data[clickedIndex]?.vocalName,
          data[clickedIndex]?.vocalProfileImage,
          data[clickedIndex]?.wavFileLength,
        );
        break;
      case "profile":
        getAudioInfos(
          data[clickedIndex]?.title,
          "내놔라 서버들아",
          data[clickedIndex]?.jacketImage,
          data[clickedIndex]?.wavFileLength,
        );
        break;
    }
  }, [clickedIndex]);

  return { clickedIndex, setClickedIndex, playAudio, audioInfos };
}
