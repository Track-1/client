import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function deleteTrack(beatId: string | undefined) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      beatId: beatId,
    },
  });
  return data;
}

export async function deletePortfolio(portfolioId: number, loginUserType: string) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/mypage/${loginUserType}/${portfolioId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}

export async function deleteTrackComment(commentId: number | undefined) {
  const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}
