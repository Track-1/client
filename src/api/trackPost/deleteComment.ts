import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function deleteComment(commentId: number) {
  try {
    const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
