import axios from "axios";

export async function getVocalProfile(props: number) {
  const state = props;

  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/vocal/${state}?page=1&limit=3`, {
      headers: {
        Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
      },
    });
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
