import axios from "axios";
import PATH from "../../core/api/common/path";
import { getCookie } from "../../utils/cookie";
import { profileCategory } from "../constants/pageCategory";

export async function UploadInfo(postData: Object, userType: string, uploadType: string | undefined) {
  switch (uploadType) {
    case profileCategory.PORTFOLIO:
      await axios.post(`${process.env.REACT_APP_BASE_URL}/${PATH.MYPAGE}/${userType}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      break;
    case profileCategory.VOCAL_SEARCHING:
      await axios.post(`${process.env.REACT_APP_BASE_URL}/${PATH.TRACKS}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
  }
}
