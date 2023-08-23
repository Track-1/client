import { CommentDataType } from "../../type/trackPost/commentDataType";
import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function postComment(commentData: CommentDataType, trackId: number) {
  const data = await client.post(`${process.env.REACT_APP_BASE_URL}/comments/${trackId}`, commentData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("accessToken")}`,
      trackId: trackId,
    },
  });

  return data;
}
