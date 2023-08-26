import { atom } from "recoil";
import { UploadDataType } from "../../type/upload/useUploadDataType";

export const UploadData = atom<UploadDataType>({
  key: "UploadData",
  default: {
    trackTitle: "",
    trackCategory: "1",
    trackAudioFile: null,
    trackAudioFileName: "",
    trackIntroduction: "",
    trackKeyword: [],
    trackImageFile: null,
  },
});
