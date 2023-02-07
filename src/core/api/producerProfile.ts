import axios from "axios";

export async function getProducerPortfolio(producerId: number, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/profile/producer/${producerId}?page=${page}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
          producerId: producerId,
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
