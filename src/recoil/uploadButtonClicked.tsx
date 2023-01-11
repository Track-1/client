import { atom } from "recoil";

export const uploadButtonClicked = atom({
  key: "uploadButtonClicked",
  default: false,
});

export const uploadButtonClickedInTrackList = atom({
  key: "uploadButtonClickedInTrackList",
  default: false,
});
