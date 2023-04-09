import { UploadDataType } from "../../type/uploadDataType";
import { getCookie } from "../../utils/cookie";
import { client } from "./common/axios";

export async function getTrackInfo(props: number) {
  const state = props;
    const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${state}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
    return data;
}

export async function getComment(page: number, beatId: number) {
  try {
    const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}?page=${page}&limit=5`, {
      headers: {
        "Content-Type": "application/json",
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
    const data = await client.post(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${beatId}`, formData, {
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
    const data = await client.patch(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, formData, {
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
    const data = await client.delete(`${process.env.REACT_APP_BASE_URL}/tracks/comments/${commentId}`, {
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
    const data = await client.patch(
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
    await client.patch(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}`, formData, {
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
  const data = await client.get(`${process.env.REACT_APP_BASE_URL}/tracks/${beatId}/download`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  //return data

  const res = await client.get(data.data.data.wavFile, {
    responseType: "blob",
  });
  return res;
  //  const res = await axios.get(data.data.data.wavFile, {
  //   responseType: 'arraybuffer',
  //   withCredentials: false,
  // });
  // return res;
}
