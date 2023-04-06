import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function getVocalsData(filteredUrlApi: string, isSelected: boolean, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/vocals/filter?${filteredUrlApi}&isSelected=${false}&page=${page}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}
