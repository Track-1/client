import { useEffect, useState } from "react";
import { AudioInfosType } from "../../type/audioTypes";

export default function usePlayerInfos(clickedIndex: number, infoDatas: any, pageCategory: string) {
  const [audioInfos, setAudioInfos] = useState<AudioInfosType>({
    title: "",
    name: "",
    progress: 0,
    duration: 0,
    image: "",
  });

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
      case "comment":
        getAudioInfos(
          String(infoDatas?.vocalWavFile),
          infoDatas?.vocalName,
          infoDatas?.vocalProfileImage,
          infoDatas?.vocalWavFileLength,
        );
    }
  }, [clickedIndex]);

  return { audioInfos, getAudioInfos };
}
