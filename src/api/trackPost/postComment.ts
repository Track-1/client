import { UploadDataType } from "../../type/upload/useUploadDataType";
import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function postComment(formData: UploadDataType, beatId: any) {
  try {
    const data = await client.post(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        beatId: beatId,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
