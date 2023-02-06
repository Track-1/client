import axios from "axios";
import { server } from "./common/axios";
import { useRecoilValue } from "recoil";
import { categorySelect } from "../../recoil/categorySelect";

export async function getTracksData(filteredUrlApi: string, page: number) {
  try {
    const data = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/tracks/filter?page=${page}&limit=6${filteredUrlApi}`,
      {
        headers: {
          Authorization: `Bearer ${`${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`}`,
        },
      },
    );
    return data?.data.data.trackList;
  } catch (e) {
    console.log(e);
  }
}

// export async function getFilteredTracks() {
//   //   let getUrl = "/tracks";
//   //   categories.forEach((categNum: string) => {
//   //     getUrl += `categ=${categNum}&`;
//   //   });

//   //   getUrl = getUrl.slice(0, getUrl.length - 1);
//   try {
//     const data = await axios.get("/tracks&categ=2&categ=3");
//     data && console.log(data);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// }
