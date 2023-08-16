import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function deleteTrackComment(commentId: number | undefined) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}
