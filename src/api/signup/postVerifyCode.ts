import axios from "axios";
import { PostVerifyCodeType } from "../../type/signUp/postVerifyCodeType";

export async function postVerifyCode(formData: PostVerifyCodeType) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/verify`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
