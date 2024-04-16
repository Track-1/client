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
  showPlayer: boolean;
  handlePlay: () => void;
}

export const AudioTestData = atom<AudioPlayingDataType>({
  key: 'AudioTestData',
  default: {
    audioSrc: '',
    audioTitle: '',
    userName: '',
    isPlaying: false,
    showPlayer: false,
    handlePlay: () => {},
  },
});

export const AudioPlayingData = atom<string>({
  key: 'AudioPlayingData',
  default: '',
});
