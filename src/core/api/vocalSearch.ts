import axios from "axios";

export async function getVocalsData() {
  try {
    const data = await axios.get("/vocals");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getFilteredVocals() {
  try {
    const data = await axios.get("/vocals&categ=Hiphop&categ=rb&…&isSelected=True");
    data && console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
}
