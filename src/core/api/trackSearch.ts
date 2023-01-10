import axios from "axios";

export async function getTracksData(props:string) {
  const filteredUrlApi= props;
  console.log(props);

  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/filter?page=1&limit=6${filteredUrlApi}`,
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
