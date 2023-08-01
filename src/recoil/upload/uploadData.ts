import { atom } from "recoil";
import { UploadDataType } from "../../type/upload/useUploadDataType";

export const UploadData = atom<UploadDataType>({
  key: "UploadData",
  default: {
    title: "",
    category: "",
    audioFile: null,
    content: "",
    keyword: [],
    jacketImage: null,
  },
});
