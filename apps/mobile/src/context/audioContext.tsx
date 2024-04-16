import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface PlayingAudioDataType {
  audioSrc: string;
  audioTitle: string;
  userName: string;
  isPlaying: boolean;
}

interface AudioContextTypes {
  audio: HTMLAudioElement;
  playingAudioSrc: string;
  changePlayingAudioSrc: (audioSrc: string) => void;
  playingAudioData: PlayingAudioDataType;
  setPlayingAudioData: React.Dispatch<React.SetStateAction<PlayingAudioDataType>>;
}

export const AudioContext = createContext<AudioContextTypes | null>(null);

export default function AudioProvider({ children }: PropsWithChildren) {
  const audio = useMemo(() => new Audio(), []);

  const [playingAudioSrc, setPlayingAudioSrc] = useState('');

  const [playingAudioData, setPlayingAudioData] = useState<PlayingAudioDataType>({
    audioSrc: '',
    audioTitle: '',
    userName: '',
    isPlaying: false,
  });

  function changePlayingAudioSrc(audioSrc: string) {
    setPlayingAudioSrc(audioSrc);
  }

  return (
    <AudioContext.Provider
      value={{ audio, playingAudioSrc, changePlayingAudioSrc, playingAudioData, setPlayingAudioData }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
}
