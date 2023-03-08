import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { validTime } from "../constants/accessTokenValidTime";

export async function onLogin(id: string, password: string) {
  const body = {
    ID: id,
    PW: password,
  };

  return await axios.post(`${process.env.REACT_APP_BASE_URL}/user/auth/login`, body, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

//페이지마다 리로드 될때 추가해줘야한다!
export async function onSilentRefresh() {
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      if (response.data.status === 201) {
        const accessToken = response.data.data;
        setCookie("accessToken", accessToken, {});
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

export function onLoginSuccess() {
  setTimeout(() => {
    onSilentRefresh();
  }, validTime.JWT_EXPIRY_TIME);
}
