import axios from "axios";
import { UploadDataType } from "../../type/uploadDataType";
import { getCookie } from "../../utils/cookie";

export async function getTrackInfo(props: number) {
  const state = props;
  console.log(state);
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
        beadId:beatId
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment(formData: UploadDataType, beatId:any) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        beatId: beatId
      },
    });
    console.log(data)
  } catch (e) {
    console.log("포스트")
    console.log(e);
  }
}

export async function updateComment(formData: UploadDataType, commentId: number) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${commentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log("수정")
    console.log(e);
  }
}


export async function getAudioFile() {
  try {
    const data = await axios.get("/tracks/:beatId/download");
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function patchProfile(beatId: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/closed`, {
      headers: {
        "Content-Type": "multipart/form-data",
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
