import { useState, useMemo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playMusic, showPlayerBar } from "../../recoil/player";

export default function usePlayer() {
  const [progress, setProgress] = useState<number>(0);
  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const audio = useMemo(() => new Audio(), []);

  function playPlayerAudio() {
    audio.play();
    setPlay(true);
  }

  function pausesPlayerAudio() {
    audio.pause();
    setPlay(false);
  }

  function closePlayer() {
    setShowPlayer(false);
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
      setProgress(currentDuration);
      checkAudioQuit();
    }
  }

  function checkAudioQuit() {
    audio.duration === audio.currentTime && setPlay(false);
  }

  return { progress, audio, playPlayerAudio, pausesPlayerAudio, closePlayer };
}
