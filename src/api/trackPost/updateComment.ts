import { CommentDataType } from "../../type/trackPost/commentDataType";
import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function updateComment(commentData: CommentDataType, commentId: number) {
  const data = await client.patch(`${process.env.REACT_APP_BASE_URL}/comments/${commentId}`, commentData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      commentId: commentId,
    },
  });

  return data;
}
