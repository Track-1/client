import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

interface AudioContextTypes {
  audio: HTMLAudioElement;
}

export const AudioContext = createContext<AudioContextTypes | null>(null);

export default function AudioProvider({ children }: PropsWithChildren) {
  const audio = useMemo(() => new Audio(), []);

  return <AudioContext.Provider value={{ audio }}>{children}</AudioContext.Provider>;
}

export function useAudioContext() {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error('useAudioContext must be used within AudioProvider');
  }
  return context;
}
