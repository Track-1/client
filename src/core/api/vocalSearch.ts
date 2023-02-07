import axios from "axios";

export async function getVocalsData(filteredUrlApi: string, isSelected: boolean, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/vocals/filter?${filteredUrlApi}&isSelected=${isSelected}&page=${page}&limit=3`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`,
        },
      },
    );
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}
