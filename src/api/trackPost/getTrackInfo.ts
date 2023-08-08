import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function getTrackInfo(props: number) {
  const state = props;
  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
    },
  });

  return data;
}
