import { atom } from "recoil";

export const clickedProfileId = atom({
  key: "clickedProfileId",
  default: -1,
});

export const hoveredProfileId = atom({
  key: "hoveredProfileId",
  default: -1,
});
