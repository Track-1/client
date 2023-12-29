import { useMemo, useState } from 'react';

export default function usePlay() {
  const audio = useMemo(() => new Audio(), []);

  const [showPlayer, setShowPlayer] = useState(false);
  const [contextPlaying, setContextPlaying] = useState(false);

  function playAudio() {
    audio.play();
  }

  function stopAudio() {
    audio.pause();
  }

  function quitAudio() {
    audio.load();
  }

  function setAudioFile(url: string) {
    if (audio.src === url) return;
    audio.src = url;
  }

  function openAudioPlayer() {
    setShowPlayer(true);
  }

  function closeAudioPlayer() {
    setShowPlayer(false);
    stopContextState();
  }

  function playContextState(playInnerState?: () => void) {
    playInnerState?.();
    setContextPlaying(true);
  }

  function stopContextState(stopInnerState?: () => void) {
    stopInnerState?.();
    setContextPlaying(false);
  }

  function isAudioPlaying() {
    return !audio.paused;
  }

  return {
    playAudio,
    stopAudio,
    quitAudio,
    setAudioFile,
    openAudioPlayer,
    closeAudioPlayer,
    playContextState,
    stopContextState,
    showPlayer,
    contextPlaying,
    audio,
    isAudioPlaying,
  };
}
