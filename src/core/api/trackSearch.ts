import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function getTracksData(filteredUrlApi: string, page: number) {
  try {
    const data = await client.get(
      `${process.env.REACT_APP_BASE_URL}/tracks/filter?page=${page}&limit=6${filteredUrlApi}`,
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
