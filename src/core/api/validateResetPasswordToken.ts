import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function validateResetPasswordToken() {
  const token = getCookie("forgotPasswordToken");
  const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`);
  return data?.data.status;
}
