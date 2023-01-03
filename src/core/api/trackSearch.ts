import axios from "axios";
import { server } from "./common/axios";

export async function getTracksData() {
  try {
    const data = await axios.get("/tracks");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getFilteredTracks() {
  //   let getUrl = "/tracks";
  //   categories.forEach((categNum: string) => {
  //     getUrl += `categ=${categNum}&`;
  //   });

  //   getUrl = getUrl.slice(0, getUrl.length - 1);
  try {
    const data = await axios.get("/tracks&categ=2&categ=3");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
