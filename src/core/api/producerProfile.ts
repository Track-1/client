import axios from "axios";

export async function getProducerProfile() {
  try {
    const data = await axios.get("/profile/producer/:producerId");
    data && console.log(data);
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
