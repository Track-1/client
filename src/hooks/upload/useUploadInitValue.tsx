import { useLocation } from "react-router-dom";
import { UploadInitType } from "../../type/upload/uploadinitType";
import { useGetPortfolioInfo } from "../queries/upload/upload";

export default function useUploadInitValue() {
  const location = useLocation();

  const uploadInit: UploadInitType = {
    image: {
      imageFile: null,
      previewImage: "",
    },
    title: "",
    audio: {
      fileName: "",
      audioType: "",
      audioFile: null,
    },
    category: "",
    hashtags: [],
    description: "",
  };

  const { modifyInit } = useGetPortfolioInfo();

  return location.pathname.includes("portfolio-edit") ? [modifyInit] : [uploadInit];
}
