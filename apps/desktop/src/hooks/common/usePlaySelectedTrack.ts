import { useState } from 'react';
import { PlayerContext } from '../../context/playerContext';

export default function usePlaySelectedTrack(
  playerContext: Omit<PlayerContext, 'showPlayer' | 'contextPlaying' | 'getPlayerInfo' | 'quitAudioForMovePage'>,
  audioFile: string,
  id: string,
  selectTrack: any,
  playingTrack: string | null
) {
  const [innerPlaying, setInnerPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function playInnerState() {
    setInnerPlaying(true);
  }

  function stopInnerState() {
    setInnerPlaying(false);
  }

  function playAudioItem(currentPlayingTrack: string) {
    playerContext.playContextState(playInnerState);
    playerContext.openAudioPlayer();
    playerContext.setAudioFile(audioFile, playingTrack, currentPlayingTrack);
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
    stopInnerState,
    playAudioItem,
    stopAudioItem,
    hoverTrack,
    unhoverTrack,
  };
}
