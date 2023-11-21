import { useState } from "react";

export default function usePlaySelectedTrack(playerContext: any, audioFile: string, id: number, selectTrack: any) {
  const [innerPlaying, setInnerPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function playInnerState() {
    setInnerPlaying(true);
  }

  function stopInnerState() {
    setInnerPlaying(false);
  }

  function playAudioItem() {
    playerContext.playContextState(playInnerState);
    playerContext.openAudioPlayer();
    playerContext.setAudioFile(audioFile);
    playerContext.playAudio();
    selectTrack(id);
  }

  function stopAudioItem() {
    playerContext.stopContextState(stopInnerState);
    playerContext.stopAudio();
  }

  function hoverTrack() {
    setIsHovered(true);
  }

  function unhoverTrack() {
    setIsHovered(false);
  }

  return {
    innerPlaying,
    isHovered,
    playAudioItem,
    stopAudioItem,
    hoverTrack,
    unhoverTrack,
  };
}
