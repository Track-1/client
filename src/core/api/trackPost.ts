import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function getTrackInfo(props: number) {
  const state = props;
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function getComment(page: number, beatId: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        beatId: beatId,
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment(formData: any) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/8`, formData, {
      headers: {
        "Content-Type": "amultipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getAudioFile(props: number, fileLink: any) {
  const state = props;
  try {
    const data = await axios
      .get(`/tracks/${state}/download`, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([fileLink], { type: "audio/mp3" }));
        console.log(response.data);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.mp3");
        document.body.appendChild(link);
        link.click();
      });
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function patchProfile(beatId: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/closed`, {
      headers: {
        "Content-Type": "amultipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    data && console.log(data);
    if (data.status === 200) {
      window.location.replace("/");
    }
  } catch (e) {
    console.log("문제발생");
    console.log(e);
  }
}
