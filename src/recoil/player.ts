import { atom } from 'recoil';

export const showPlayerBar = atom({
  key: 'showPlayerBar',
  default: false,
});

export const playMusic = atom({
  key: 'playMusic',
  default: false,
});
