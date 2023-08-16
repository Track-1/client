import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function getComment(page: number, beatId: number) {
  try {
    const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
        beadId: beatId,
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}
