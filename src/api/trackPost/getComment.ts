import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function getComment(page: number, trackId: number) {
  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${trackId}?page=${page}&limit=5`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
      trackId: trackId,
    },
  });
  return data?.data.data;
}
