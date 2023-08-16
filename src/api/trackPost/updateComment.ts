import { UploadDataType } from "../../type/upload/useUploadDataType";
import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function updateComment(formData: UploadDataType, commentId: number) {
  try {
    const data = await client.patch(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
