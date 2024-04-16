import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const AudioPlayingState = atom<boolean>({
  key: 'AudioPlayingState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

interface AudioPlayingDataType {
  audioSrc: string;
  audioTitle: string;
  userName: string;
  isPlaying: boolean;
}

export const AudioPlayingData = atom<string>({
  key: 'AudioPlayingData',
  default: '',
});
