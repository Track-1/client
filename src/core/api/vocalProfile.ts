import axios from "axios";

export async function getVocalProfile(state:number, userType:string) {
  const accessToken=userType==="producer"?`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`:`${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/profile/vocal/${state}?page=1&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
