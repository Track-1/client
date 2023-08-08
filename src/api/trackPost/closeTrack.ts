import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function closeTrack(beatId: number) {
  try {
    const data = await client.patch(
      `${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/closed`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );
  } catch (e) {
    console.log(e);
  }
}
