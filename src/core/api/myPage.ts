import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function getUserInfo(page: number, limit: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/mypage?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
