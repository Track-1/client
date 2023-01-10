import axios from "axios";


export async function UploadInfo(postData: Object) {
  try {
    console.log(postData);
    await axios.post("https://www.track-1.link/tracks", postData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MiwiaWF0IjoxNjczMjAwNTExLCJleHAiOjE3MDQ3MzY1MTF9.OtWWSdtZuaM5qa9uYkNfm7dWDNOhsszBa7yGzFfsM2U"}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
