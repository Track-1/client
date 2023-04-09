import axios from "axios";
import { getCookie, removeCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function onLogout() {
  try {
    const data = await client.get(`${process.env.REACT_APP_BASE_URL}/user/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    if (data.status === 200) {
      removeCookie("accessToken", { path: "/" });
      window.location.replace("/");
    }
  } catch (e) {
    console.log(e);
  }
}
