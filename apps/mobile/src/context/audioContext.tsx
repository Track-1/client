import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface AudioContextTypes {
  audio: HTMLAudioElement;
  playingAudioSrc: string;
  changePlayingAudioSrc: (audioSrc: string) => void;
}

export const AudioContext = createContext<AudioContextTypes | null>(null);

export default function AudioProvider({ children }: PropsWithChildren) {
  const audio = useMemo(() => new Audio(), []);

  const [playingAudioSrc, setPlayingAudioSrc] = useState('');

  function changePlayingAudioSrc(audioSrc: string) {
    setPlayingAudioSrc(audioSrc);
  }

  return (
    <AudioContext.Provider value={{ audio, playingAudioSrc, changePlayingAudioSrc }}>{children}</AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
}
