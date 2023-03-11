import axios from "axios";
import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function getVocalProfile(vocalId: number, page: number) {
  // const accessToken =
  //   userType === "producer"
  //     ? `${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`
  //     : `${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`;
  try {
    const data = await client.get(`/profile/vocal/${2}?page=${2}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data);
    return data?.data.data;
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
