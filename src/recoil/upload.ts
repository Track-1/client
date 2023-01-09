import { atom } from "recoil";
import TrackUploadDefaultImg from "../assets/image/trackUploadDefaultImg.png";
import VocalUploadDefaultImg from "../assets/image/vocalUploadDefaultImg.png";

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

export const uploadTrackJacketImage = atom<File>({
  key: "uploadTrackJacketImage",
  default: TrackUploadDefaultImg,
});

export const uploadVocalJacketImage = atom<File>({
  key: "uploadVocalJacketImage",
  default: VocalUploadDefaultImg,
});
