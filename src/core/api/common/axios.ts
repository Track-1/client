import axios from "axios";
import { getCookie, setCookie } from "../../../utils/cookie";

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
});

client.interceptors.request.use(function (config: any) {
  const token = getCookie("accessToken");

  if (!token) {
    config.headers["accessToken"] = null;
    return config;
  }

  if (config.headers && token) {
    // config.headers[
    //   "Authorization"
    // ] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MSwiaWF0IjoxNjc5OTA3MzMyLCJleHAiOjE2Nzk5MDczMzN9.DcIOMZotyDYFyH_i14NVZXGp9KC5Oh6UtG5MjSSkfc4`;
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  }

  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
    const originConfig = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        });
        if (data) {
          console.log(data);
          alert("토큰갱신 성공!!!");
          setCookie("accessToken", data.data.data, {});

          return await client.request(originConfig);
        }
      } catch (error) {
        alert("토큰갱신 실패했다!");
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
