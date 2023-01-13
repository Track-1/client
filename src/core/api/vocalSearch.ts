import axios from "axios";

// export async function getVocalsData(filteredUrlApi: string, isSelected: boolean, pageNum: number) {
//   try {
//     const data = await axios.get(
//       `${process.env.REACT_APP_BASE_URL}/vocals/filter?page=${pageNum}&limit=8${filteredUrlApi}&isSelected=${isSelected}`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`,
//         },
//       },
//     );
//     data && console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }

export async function getVocalsData(filteredUrlApi: string, isSelected: boolean) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/vocals/filter?page=1&limit=100${filteredUrlApi}&isSelected=${isSelected}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`,
        },
      },
    );
    // data && console.log(data);
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
