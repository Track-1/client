import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function patchResetPassword(password: string) {
  const token = getCookie("forgotPasswordToken");
  const body = {
    password: password,
  };

  const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}
