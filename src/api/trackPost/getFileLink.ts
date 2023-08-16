import axios from "axios";
import { getCookie } from "../../utils/common/cookie";
import { client } from "../common/client";

export async function getFileLink(beatId: number) {
  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/download`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  const res = await axios.get(data?.data?.data?.wavFile, {
    responseType: "blob",
  });

  return res;
}
