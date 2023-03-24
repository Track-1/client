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
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data)
  } catch (e) {
    console.log("수정")
    console.log(e);
  }
}

export async function deleteComment(commentId: number) {
  try {
    const data = await axios.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(data)
  } catch (e) {
    console.log("삭제")
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

export async function patchTrackPost(beatId: number, formData: any) {
  try {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}
