import axios from "axios";

import { getCookie } from "../../utils/cookie";

export async function getProducerPortfolio(producerId: number, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/profile/producer/${producerId}?page=${page}&limit=3`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSelectingTracks(producerId: number, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/profile/producer/${producerId}/beats?page=${page}&limit=3`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postProducerPortfolio() {
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/mypage/producer`);
  } catch (e) {
    console.log(e);
  }
}

export async function patchProducerPortfolio(producerPortfolioId: number, editDatas: any) {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/mypage/producer/${producerPortfolioId}`, editDatas, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function patchProducerProfile(editData: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/profile/producer`, editData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}
