import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function patchProfile(formData: any) {
      const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/join/profile`, formData, {
        headers: {
          "Content-Type": "amultipart/form-data",
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      data&&console.log(data)
}