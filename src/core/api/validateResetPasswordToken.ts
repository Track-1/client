import axios from "axios";

export async function validateResetPasswordToken() {
  const token = localStorage.getItem("token");
  const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`).catch((error) => {
    console.log(error);
  });

  return data?.data.status;
}
