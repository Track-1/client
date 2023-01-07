import axios from "axios";

export async function getVocalProfile() {
  try {
    const data = await axios.get("/profile/vocal/:vocalId");
    data && console.log(data);
    return data && data;
  } catch (e) {
    console.log(e);
  }
}

export async function postVocalPortfolio() {
  try {
    await axios.post("/mypage/vocal");
  } catch (e) {
    console.log(e);
  }
}
