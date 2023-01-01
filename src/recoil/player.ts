import { atom } from 'recoil';

export const showPlayerBar = atom({
  key: 'showPlayerBar',
  default: false,
});

export const playMusic = atom({
  key: 'playMusic',
  default: false,
});

export const trackClicked = atom({
  key: 'trackClicked',
  default: -1,
});

export const playingTrackId = atom({
  key: 'playingTrackId',
  default: -1,
})