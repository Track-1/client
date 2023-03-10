import axios from "axios";
import { client } from "./common/axios";
import { setCookie, getCookie } from "../../utils/cookie";

export async function getProducerPortfolio(producerId: number, page: number) {
  try {
    const data = await axios.get(`/profile/producer/${producerId}?page=${page}&limit=3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        producerId: 1,
      },
    });
    return data?.data[0];
  } catch (e) {
    console.log(e);
  }
}

export async function getSelectingTracks(producerId: number, page: number) {
  try {
    const data = await axios.get(`/profile/producer/${producerId}/beats?page=${page}&limit=3`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        producerId: producerId,
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postProducerPortfolio() {
  try {
    await axios.post("/mypage/producer");
  } catch (e) {
    console.log(e);
  }
}

export async function patchProducerPortfolio(producerPortfolioId: number, editDatas: any) {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/mypage//producer/${producerPortfolioId}`, editDatas, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(getCookie("accessToken"));
  } catch (e) {
    console.log(e);
  }
}
