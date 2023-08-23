import { client } from "../common/client";

export async function getComment(page: number, trackId: number) {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MSwiaWF0IjoxNjkyMTkzMzM3LCJleHAiOjE2OTczNzczMzd9.ORQNliZNoDmNF4S8KsmPnfkmN4QkUqLONKQQukX-za8`;

  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/comments/${trackId}?page=${page}&limit=5`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
      Authorization: `Bearer ${token}`,
      trackId: trackId,
    },
  });
  return data?.data.data;
}
