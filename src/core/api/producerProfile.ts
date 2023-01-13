import axios from "axios";

export async function getProducerProfile(producerId: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/producer/${producerId}?page=1&limit=3`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        producerId: producerId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSelectingTracks() {
  try {
    const data = await axios.get("/profile/producer/:producerId/beats");
    data && console.log(data);
    return data;
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
