import axios from "axios";

export async function patchProfile(formData: any) {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/join/profile`, formData, {
        headers: {
          "Content-Type": "amultipart/form-data",
          Authorization: `Bearer ${`${process.env.REACT_APP_VOCAL_ACCESSTOKEN}`}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
}