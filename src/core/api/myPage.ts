import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function getUserInfo(page: number, limit: number) {
  try {
    const data = await client.get(`${process.env.REACT_APP_BASE_URL}/mypage?page=${page}&limit=${limit}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
