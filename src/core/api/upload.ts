import PATH from "../../core/api/common/path";
import { getCookie } from "../../utils/cookie";
import { profileCategory } from "../constants/pageCategory";
import { client } from "./common/axios";

export async function UploadInfo(postData: Object, userType: string, uploadType: string | undefined) {
  switch (uploadType) {
    case profileCategory.PORTFOLIO:
      try {
        await client.post(`${process.env.REACT_APP_BASE_URL}/${PATH.MYPAGE}/${userType}`, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
      } catch (e) {
        console.log(e);
      }
      break;
    case profileCategory.VOCAL_SEARCHING:
      try {
        await client.post(`${process.env.REACT_APP_BASE_URL}/${PATH.TRACKS}`, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
      } catch (e) {
        console.log(e);
      }
  }
}
