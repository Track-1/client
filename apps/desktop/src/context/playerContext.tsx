import usePaly from '../hooks/common/usePlay';
import { PropsWithChildren, useState } from 'react';
import { createContext } from '../utils/common/createContext';

export function PlayerProvider({ children, scope }: PropsWithChildren<{ scope?: string }>) {
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
  } = usePaly();
  const [playerInfo, setPlayerInfo] = useState();

  function getPlayerInfo(info: any) {
    setPlayerInfo(info);
  }

  function quitAudioForMovePage() {
    quitAudio();
    closeAudioPlayer();
  }

  return (
    <PlayProvider
      contextValues={{
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
      }}
      scope={scope}>
      {children}
    </PlayProvider>
  );
}

export type PlayerContext = {
  playAudio: () => void;
  stopAudio: () => void;
  quitAudio: () => void;
  setAudioFile: (url: string, prevPlayingTrack: string | null, currentPlayingTrack: string) => void;
  openAudioPlayer: () => void;
  closeAudioPlayer: () => void;
  playContextState: (playInnerState?: () => void) => void;
  stopContextState: (stopInnerState?: () => void) => void;
  showPlayer: boolean;
  contextPlaying: boolean;
  audio: HTMLAudioElement;
  playerInfo: any;
  getPlayerInfo: (info: any) => void;
  quitAudioForMovePage: () => void;
};

export const { PlayProvider, PlayUseContext } = createContext<PlayerContext>({
  defaultValue: {
    playAudio: () => {},
    stopAudio: () => {},
    quitAudio: () => {},
    setAudioFile: (url: string, prevPlayingTrack: string | null, currentPlayingTrack: string) => {},
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
  },
  contextName: 'Play',
});
