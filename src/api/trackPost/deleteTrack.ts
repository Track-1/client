import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function deleteTrack(beatId: string | number | undefined) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      beatId: beatId,
    },
  });
  return data;
}
