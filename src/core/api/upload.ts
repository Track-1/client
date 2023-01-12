import axios from "axios";
import PATH from "../../core/api/common/path";
import { currentUser } from "../constants/userType";

export async function UploadInfo(postData: Object, userType: string, producerUploadType: string | undefined) {
  try {

    switch (userType) {
      case currentUser.PRODUCER:
        const path = producerUploadType === currentUser.PRODUCER ? `${PATH.MYPAGE}/${PATH.PRODUCER}` : `${PATH.TRACKS}`;
        await axios.post(`${process.env.REACT_APP_BASE_URL}/${path}`, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
          },
        });
        break;
      case currentUser.VOCAL:
        await axios.post(`${process.env.REACT_APP_BASE_URL}/${PATH.MYPAGE}/${PATH.VOCAL}`, postData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${`${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`}`,
          },
        });
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
