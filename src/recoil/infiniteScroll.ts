import { atom } from "recoil";

export const trackListinfiniteScroll = atom({
  key: "trackListinfiniteScroll",
  default: 1,
});

export const prevTrackListinfiniteScroll = atom({
  key: "prevTrackListinfiniteScroll",
  default: 0,
});