import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function getTrackInfo(trackId: number | undefined) {
  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${trackId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
      trackId: trackId,
    },
  });

  return data?.data?.data;
}
