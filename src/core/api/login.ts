import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { validTime } from "../constants/accessTokenValidTime";
import { Cookies } from "react-cookie";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "refreshToken";
axios.defaults.xsrfHeaderName = "AxiosHeaders";

export async function onLogin(id: string, password: string) {
  const body = {
    ID: id,
    PW: password,
  };

  const data = await axios
    .post(`${process.env.REACT_APP_BASE_URL}/user/auth/login`, JSON.stringify(body), {
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
        credentials: "include",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      console.log(response.headers["set-cookie"]);
      console.log(response.config);
      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        setCookie("accessToken", accessToken, {});
        onLoginSuccess(accessToken);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}

//페이지마다 리로드 될때 추가해줘야한다!
export async function onSilentRefresh() {
  axios
    .get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("accessToken")}`,
        withCredentials: true,
      },
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

export async function onLoginSuccess(accessToken: string) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  setTimeout(onSilentRefresh, validTime.JWT_EXPIRY_TIME - 60000);
}
