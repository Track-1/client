import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import usePlay from '../hooks/common/usePlay';

export const PlayerContext = createContext<any>({
  playAudio: () => {},
  stopAudio: () => {},
  quitAudio: () => {},
  setAudioFile: (url: string) => {},
  openAudioPlayer: () => {},
  closeAudioPlayer: () => {},
  playContextState: (playInnerState?: () => void) => {},
  stopContextState: (stopInnerState?: () => void) => {},
  showPlayer: false,
  contextPlaying: false,
  audio: new Audio(),
  playerInfo: {},
  getPlayerInfo: (info: any) => {},
  quitAudioForMovePage: () => {},
});

export function PlayerProvider({ children }: PropsWithChildren) {
  const {
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
  } = usePlay();
  const [playerInfo, setPlayerInfo] = useState();

  function getPlayerInfo(info: any) {
    setPlayerInfo(info);
  }

  function quitAudioForMovePage() {
    quitAudio();
    closeAudioPlayer();
  }

  return (
    <PlayerContext.Provider
      value={{
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
        playerInfo,
        getPlayerInfo,
        quitAudioForMovePage,
        isAudioPlaying,
      }}>
      {children}
    </PlayerContext.Provider>
  );
}
