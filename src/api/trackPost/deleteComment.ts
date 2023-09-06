import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function deleteComment(commentId: number) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      commentId: commentId,
    },
  });

  return data;
}
