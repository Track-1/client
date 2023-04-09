import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function getVocalsData(filteredUrlApi: string, isSelected: boolean, page: number) {
  const selected = isSelected ? "True" : "False";
  try {
    const data = await client.get(
      `${process.env.REACT_APP_BASE_URL}/vocals/filter?${filteredUrlApi}&isSelected=${selected}&page=${page}&limit=3`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}
