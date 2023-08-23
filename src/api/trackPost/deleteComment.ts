import { client } from "../common/client";

export async function deleteComment(commentId: number) {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MSwiaWF0IjoxNjkyMTkzMzM3LCJleHAiOjE2OTczNzczMzd9.ORQNliZNoDmNF4S8KsmPnfkmN4QkUqLONKQQukX-za8`;

  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getCookie("accessToken")}`,
      Authorization: `Bearer ${token}`,
      commentId: commentId,
    },
  });

  return data;
}
