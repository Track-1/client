import { UploadDataType } from "../../../type/upload/useUploadDataType";
import { PATH } from "../../../core/common/path";
import { client } from "../../common/client";

export function uploadVocalSearching(uploadData: UploadDataType) {
  console.log(uploadData);
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjkyMjAwMDkxLCJleHAiOjE2OTczODQwOTF9.3WlB_9XRaf0_rGC3J8iY6qHkSOU7nMUL-YXO-_cIFH0";

  return client.post(
    `/${PATH.TRACKS}`,
    {
      trackTitle: uploadData.trackTitle,
      // trackCategory : uploadData.category
      trackCategory: 1, // 변경예정
      trackAudioFile: uploadData.trackAudioFile,
      trackAudioFileName: "홍명헌", //변경예정
      trackIntroduction: uploadData.trackIntroduction,
      trackKeyword: uploadData.trackKeyword,
      trackImageFile: uploadData.trackImageFile,
    },
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

  return client.post(
    `/${PATH.MYPAGE}/${PATH.PRODUCER}`,
    {
      trackTitle: uploadData.trackTitle,
      // trackCategory : uploadData.category
      trackCategory: 1, // 변경예정
      trackAudioFile: uploadData.trackAudioFile,
      trackAudioFileName: "홍명헌", //변경예정
      trackIntroduction: uploadData.trackIntroduction,
      trackKeyword: uploadData.trackKeyword,
      trackImageFile: uploadData.trackImageFile,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
}
