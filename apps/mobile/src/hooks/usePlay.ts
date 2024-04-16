import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useAudioContext } from 'src/context/audioContext';
import { AudioPlayingData } from 'src/recoil/common/audio';

export function usePlay(audioSrc: string) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const { audio } = useAudioContext();
  const [audioPlayingData, setAudioPlayingData] = useRecoilState(AudioPlayingData);

  useEffect(() => {
    if (audioSrc !== audioPlayingData) {
      setIsPlaying(false);
    }
  }, [audioPlayingData]);

  function playAudio() {
    audio.play();
    setIsPlaying(true);
  }

  function pauseAudio() {
    audio.pause();
    setIsPlaying(false);
  }

  function setAudioInit() {
    setAudioPlayingData(audioSrc);
    audio.src = audioSrc;
  }

  function handlePlay() {
    if (audioPlayingData !== audioSrc) {
      setAudioInit();
      setShowPlayer(true);
    }

    if (audioSrc === audioPlayingData && !showPlayer) {
      setAudioInit();
      console.log('here');
    }

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  return {
    isPlaying,
    showPlayer,
    playAudio,
    pauseAudio,
    handlePlay,
  };
}
