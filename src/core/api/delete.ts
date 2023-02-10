import axios from "axios";

export async function deleteTrack(beatId: string | undefined) {
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
        beatId: beatId,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}
