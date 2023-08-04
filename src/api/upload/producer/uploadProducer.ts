import axios from "axios";
import { UploadDataType } from "../../../type/upload/useUploadDataType";
import { PATH } from "../../../core/common/path";


export function uploadVocalSearching(uploadData: UploadDataType) {
  const accessToken = "";

  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/${PATH.TRACKS}`,
    { uploadData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}


export function uploadProducerPortfolio(uploadData: UploadDataType) {
  const accessToken = "";

  return axios.post(
    `${process.env.REACT_APP_BASE_URL}/${PATH.MYPAGE}/${PATH.PRODUCER}`,
    { uploadData },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}
