import axios from "axios";
import { setCookie, getCookie } from "../../utils/cookie";
import { validTime } from "../constants/accessTokenValidTime";
import { Cookies, useCookies } from "react-cookie";
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
      const [cookies, setCookies] = useCookies(["refreshToken"]);
      console.log(cookies);
      console.log(response);
      console.log(response.headers["set-cookie"]);
      console.log(document.cookie);
      console.log(getCookie("set-cookie"));
      console.log(getCookie("Set-Cookie"));
      console.log(getCookie("refreshToken"));
      console.log(response.config);
      console.log(response.headers.cookies);

      if (response.status === 200) {
        const accessToken = response.data.data.accessToken;
        setCookies("refreshToken", response.headers.cookies);
        // setCookie("accessToken", accessToken, {});
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
  setTimeout(() => {
    console.log("1분 지났다!!");
    onSilentRefresh();
  }, 60 * 1000);
}
