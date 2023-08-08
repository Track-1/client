import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function patchTrackPost(beatId: number, formData: any) {
  try {
    await client.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
