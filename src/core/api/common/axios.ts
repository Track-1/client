import axios from "axios";
import { getCookie, setCookie } from "../../../utils/cookie";

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
  withCredentials: true,
});

client.interceptors.request.use(function (config: any) {
  const token = getCookie("accessToken");

  if (!token) {
    config.headers["accessToken"] = null;
    return config;
  }

  if (config.headers && token) {
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
      console.log("hello");
      try {
        const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
          withCredentials: true,
        });
        if (data) {
          console.log(data);
          setCookie("accessToken", data.data.data, {});
          return await client.request(originConfig);
        }
      } catch (error) {
        console.log(error);
      }
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
