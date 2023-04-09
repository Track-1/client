import axios from "axios";
import { UploadDataType } from "../../type/uploadDataType";
import { getCookie } from "../../utils/cookie";

export async function getTrackInfo(props: number) {
  const state = props;
  const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
    },
  });

  return data;
}

export async function getComment(page: number, beatId: number) {
  try {
    const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getCookie("accessToken") !== undefined ? `Bearer ${getCookie("accessToken")}` : null,
        beadId: beatId,
      },
    });
    return data?.data.data;
  } catch (e) {
    console.log(e);
  }
}

export async function postComment(formData: UploadDataType, beatId: any) {
  try {
    const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        beatId: beatId,
      },
    });
  } catch (e) {
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
  } catch (e) {
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
  } catch (e) {
    console.log(e);
  }
}

export async function closeTrack(beatId: number) {
  try {
    const data = await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/closed`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      },
    );
  } catch (e) {
    console.log(e);
  }
}

export async function patchTrackPost(beatId: number, formData: any) {
  try {
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getFileLink(beatId: number) {
  const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/download`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  //return data

  const res = await axios.get(data.data.data.wavFile, {
    responseType: "blob",
  });
  return res;
  //  const res = await axios.get(data.data.data.wavFile, {
  //   responseType: 'arraybuffer',
  //   withCredentials: false,
  // });
  // return res;
}
