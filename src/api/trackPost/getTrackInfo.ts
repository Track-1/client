import { client } from "../common/client";

export async function getTrackInfo(trackId: number | undefined) {
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6OCwiaWF0IjoxNjkxMzc2MDc5LCJleHAiOjE2OTY1NjAwNzl9.xR9h-K86b7s6090OvdNv45YJi-8bynplAq9UrUnhK5s`;

  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${trackId}`, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
      Authorization: `Bearer ${token}`,
    },
  });

  return data?.data?.data;
}
