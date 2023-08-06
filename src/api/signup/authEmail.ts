import axios from "axios";
import { AuthEmailType } from "../../type/signUp/authEmailType";

export async function authEmail(formData: AuthEmailType) {
  const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/etc/auth-mail`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
