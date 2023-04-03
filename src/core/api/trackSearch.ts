import axios from "axios";
import { useRecoilValue } from "recoil";
import { categorySelect } from "../../recoil/categorySelect";

export async function getTracksData(filteredUrlApi: string, page: number) {
  //console.log(filteredUrlApi)
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tracks/filter?page=${page}&limit=6${filteredUrlApi}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}