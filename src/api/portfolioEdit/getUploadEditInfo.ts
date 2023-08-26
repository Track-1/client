import { PATH } from "../../core/common/path";
import { ROLE } from "../../core/common/roleType";
import { UPLOAD_TYPE } from "../../core/common/uploadType";
import { client } from "../common/client";

export async function getUploadEditInfo(rollType: string, uploadType: string, trackId?: string) {
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjkyMjAwMDkxLCJleHAiOjE2OTczODQwOTF9.3WlB_9XRaf0_rGC3J8iY6qHkSOU7nMUL-YXO-_cIFH0";

  let url = "";

  if (rollType === ROLE.PRODUCER) {
    uploadType === UPLOAD_TYPE.PORTFOLIO
      ? (url = `/${PATH.PROFILE}/${PATH.PRODUCER}/4/beats?page=2&limit=3`)
      : (url = `/${PATH.TRACKS}/${trackId}`);
  } else {
    //보컬 포트폴리오
    url = "";
  }

  const data = await client.get(url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${getCookie("accessToken")}`,
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return data;
}
