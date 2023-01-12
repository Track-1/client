import axios from "axios";
import PATH from "../../core/api/common/path";

export async function UploadInfo(postData: Object, userType: string, producerUploadType: string | undefined) {
  try {
    if (userType === "producer") {
      const path = producerUploadType === ":Portfolio" ? `${PATH.MYPAGE}/${PATH.PRODUCER}` : `${PATH.TRACKS}`;
      await axios.post(`${process.env.REACT_APP_BASE_URL}/${path}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
        },
      });
    } else {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/${PATH.MYPAGE}/${PATH.VOCAL}`, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${`${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`}`,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
}
