import axios from "axios";

export async function patchResetPassword(password: string) {
  const token = localStorage.getItem("token");
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/etc/newpassword/${token}`, password, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("data:", data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
