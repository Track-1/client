import axios from "axios";

export async function validateResetPasswordToken(token : string) {
  const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`);
  return data?.data.status;
}
