import axios from "axios";
import { server } from "./common/axios";

export async function getProducerProfile() {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/producer/2?page=1&limit=2`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
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
