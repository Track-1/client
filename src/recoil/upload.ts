import { atom } from "recoil";
import TrackDefaultImage from "../assets/image/trackUploadDefaultImg.png";
import VocalDefaultImage from "../assets/image/vocalUploadDefaultImg.png";

let trackDefaultImage;
let vocalDefaultImage;



// const convertURLtoFile = async (url: string) => {
//   const response = await fetch(url);
//   const data = await response.blob();
//   const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
//   const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
//   const metadata = { type: `image/${ext}` };
//   return new File([data], filename!, metadata);
// };

// const test = convertURLtoFile("../assets/image/trackUploadDefaultImg.png");

fetch(TrackDefaultImage.src)
  .then((res) => res.blob())
  .then((blob) => {
    // const file = new File([blob], "trackdefaultimage.png", blob);
    trackDefaultImage = new File([blob], "trackDefaultimage.png", blob);
  });

fetch(VocalDefaultImage.src)
  .then((res) => res.blob())
  .then((blob) => {
    // const file = new File([blob], "vocalDefaultimage.png", blob);
    vocalDefaultImage = new File([blob], "vocalDefaultimage.png", blob);
  });

console.log(trackDefaultImage);
console.log(vocalDefaultImage);

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
  default: trackDefaultImage,
});

export const uploadVocalJacketImage = atom<File>({
  key: "uploadVocalJacketImage",
  default: vocalDefaultImage,
});
