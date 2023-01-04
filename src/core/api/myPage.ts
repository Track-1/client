import axios from "axios";

export async function getUserInfo() {
  try {
    const data = await axios.get("/mypage");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
