import { useMutation, useQuery } from "react-query";
import { UploadInitType } from "../../../type/upload/uploadinitType";
import { QUERIES_KEY } from "../../../core/common/queriesKey";

export function useGetPortfolioInfo() {
  const { data } = useQuery(QUERIES_KEY.GET_PRODUCER_PORTFOLIO_INFO, () => {});

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
