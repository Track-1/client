import { UploadInitType } from "../../../type/upload/uploadinitType";

export function useGetPortfolioInfo() {
  const modifyInit: UploadInitType = {
    image: {
      imageFile: null,
      previewImage: "",
    },
    title: "api로 받아온 TITLE!",
    audio: {
      fileName: "FILE_NAME",
      audioType: ".mp3",
      audioFile: null,
    },
    category: "",
    hashtags: [],
    description: "api로 받아온 DESCRIPTION!",
  };

  return { modifyInit };
}
