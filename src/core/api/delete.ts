import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function deleteTrack(beatId: string | undefined) {
  const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      beatId: beatId,
    },
  });
  return data;
}

export async function deleteVocalPortfolio(portfolioId: number) {
  const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mypage/vocal/${portfolioId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}

export async function deleteProducerPortfolio(portfolioId: number) {
  const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/mypage/producer/${portfolioId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
}

export async function deleteTrackComment(commentId: string | undefined) {
  const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comment/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getCookie("accessToken")}`,
      commentId: commentId,
    },
  });
  return data;
}
