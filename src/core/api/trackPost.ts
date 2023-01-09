import axios from "axios";

export async function getTrackInfo(props:number) {
  const state=props
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`,
    {
      headers: {
        Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
      },
    });
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getComment() {
  //trackid 필요해
  try {
    const data = await axios.get("/tracks/comments/:beatId");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment() {
  //trackid 필요해
  try {
    await axios.post("/tracks/:beatId", {});
  } catch (e) {
    console.log(e);
  }
}

export async function getAudioFile() {
  try {
    const data = await axios.get("/tracks/:beatId/download");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
