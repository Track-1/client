import { CommentDataType } from "../../type/trackPost/commentDataType";
import { client } from "../common/client";

export async function postComment(commentData: CommentDataType, trackId: number) {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MSwiaWF0IjoxNjkyMTkzMzM3LCJleHAiOjE2OTczNzczMzd9.ORQNliZNoDmNF4S8KsmPnfkmN4QkUqLONKQQukX-za8`;
  const data = await client.post(`${process.env.REACT_APP_BASE_URL}/comments/${trackId}`, commentData, {
    headers: {
      "Content-Type": "multipart/form-data",
      // Authorization: `Bearer ${getCookie("accessToken")}`,
      Authorization: `Bearer ${token}`,
      trackId: trackId,
    },
  });

  return data;
}
