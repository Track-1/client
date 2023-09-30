import { atom } from "recoil";
import { UploadDataType } from "../../type/upload/useUploadDataType";

export const UploadData = atom<UploadDataType>({
  key: "UploadData",
  default: {
    title: "",
    category: "1",
    audioFile: null,
    audioFileName: "",
    introduction: "",
    keyword: [],
    imageFile: null,
  },
});
