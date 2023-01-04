import axios from "axios";

export async function postTrackData() {
  try {
    await axios.post("/tracks", {});
  } catch (e) {
    console.log(e);
  }
}
