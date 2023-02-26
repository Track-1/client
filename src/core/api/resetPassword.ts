import axios from "axios";

export async function patchResetPassword(password: string) {
  const token = "";
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`, {
      body: {
        password: password,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
