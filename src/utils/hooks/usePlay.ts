import { useState, useMemo, useEffect } from "react";

export default function usePlay() {
  const [play, setPlay] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const audio = useMemo(() => new Audio(), []);

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
      setProgress(currentDuration);
      checkAudioQuit();
    }
  }

  function checkAudioQuit() {
    audio.duration === audio.currentTime && setPlay(false);
  }

  return { play, setPlay, progress, setProgress, audio };
}
