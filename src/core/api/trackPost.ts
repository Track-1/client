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

export async function getComment(props:number) {
  const state=props
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${state}?page=1&limit=2`, 
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

export async function postComment(props:number) {
  const state=props
  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
      //body
    },
    {
      headers: {
        Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
      },
    });
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
