import axios from "axios";

export async function getVocalsData(filteredUrlApi:string, isSelected:boolean) {
  console.log(filteredUrlApi)
  console.log(isSelected)

  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/vocals/filter?page=1&limit=8${filteredUrlApi}&isSelected=${isSelected}`,
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

// export async function getFilteredVocals() {
//   try {
//     const data = await axios.get("/vocals&categ=Hiphop&categ=rb&…&isSelected=True");
//     data && console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }
