import { atom } from "recoil";
import TrackDefaultImage from "../assets/image/trackUploadDefaultImg.png";
import VocalDefaultImage from "../assets/image/vocalUploadDefaultImg.png";

let trackDefaultImage;
let vocalDefaultImage;

// fetch(TrackDefaultImage.src)
//   .then((res) => res.blob())
//   .then((blob) => {
//     trackDefaultImage = new File([blob], "trackDefaultimage.png", blob);
//   });

// fetch(VocalDefaultImage.src)
//   .then((res) => res.blob())
//   .then((blob) => {
//     vocalDefaultImage = new File([blob], "vocalDefaultimage.png", blob);
//   });

async function convertURLtoFile(url: string) {
  const response = await fetch(url);
  const data = await response.blob();
  return data;
}

convertURLtoFile("../assets/image/trackUploadDefaultImg.png").then((data) => {
  trackDefaultImage = data;
  vocalDefaultImage = data;
});

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

export const uploadTrackJacketImage = atom<File | Blob>({
  key: "uploadTrackJacketImage",
  default: trackDefaultImage,
});

export const uploadVocalJacketImage = atom<File | Blob>({
  key: "uploadVocalJacketImage",
  default: vocalDefaultImage,
});

export const defaultImageState = atom<boolean>({
  key: "defaultImageState",
  default: true,
});
