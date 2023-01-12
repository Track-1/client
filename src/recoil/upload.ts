import { atom } from "recoil";
import TrackDefaultImage from "../assets/image/trackUploadDefaultImg.png";
import VocalDefaultImage from "../assets/image/vocalUploadDefaultImg.png";

let trackDefaultImage = new FormData(TrackDefaultImage);
let vocalDefaultImage = new FormData(VocalDefaultImage);


export const uploadTitle = atom<string>({
  key: "uploadTitle",
  default: "",
});

export const uploadCategory = atom<string>({
  key: "uploadCategory",
  default: "",
});

export const uploadWavFile = atom<File | null>({
  key: "uploadWavFile",
  default: null,
});

export const uploadIntroduce = atom<string>({
  key: "uploadIntroduce",
  default: "",
});

export const uploadKeyword = atom<Array<string>>({
  key: "uploadKeyword",
  default: [],
});

export const uploadTrackJacketImage = atom<File | FormData>({
  key: "uploadTrackJacketImage",
  default: trackDefaultImage,
});

export const uploadVocalJacketImage = atom<File | FormData>({
  key: "uploadVocalJacketImage",
  default: vocalDefaultImage,
});
