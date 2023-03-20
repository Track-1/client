import axios from "axios";
import { getCookie } from "../../utils/cookie";

export async function patchTitleAPI(oldId: number, newId: number, loginUserType: string) {
  const data = await axios.patch(
    `${process.env.REACT_APP_BASE_URL}/mypage/${loginUserType}?oldId=${oldId}&newId=${newId}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie("accessToken")}`,
      },
    },
  );
  return data;
}

export async function patchJoinProfile(formData: any) {
    const data = await axios.patch(`${process.env.REACT_APP_BASE_URL}/user/join/profile`, formData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    });
    data&&console.log(data)
}