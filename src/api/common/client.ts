import axios from "axios";
import { getCookie } from "../../utils/common/cookie";

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: getCookie("accessToken") ? `Bearer ${getCookie("accessToken")}` : "",
    // Authorization: `Bearer ${process.env.REACT_PRODUCER_ACCESSTOKEN}`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjk2Mjc1Nzk5LCJleHAiOjE3MDE0NTk3OTl9.eaoiQV7qQzQjro2RGUQDfY9PFL1OwFxRjO7qtZDkNjc`,
    // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MSwiaWF0IjoxNjk1NTM2MTA4LCJleHAiOjE3MDA3MjAxMDh9.bBGGuYDYo04pdJyLC7oKUlRMhTVjBP9ysQWbkoTruSA`,
  },
  withCredentials: true,
});

// client.interceptors.request.use(function (config: any) {
//   const token = getCookie("accessToken");

//   if (!token) {
//     config.headers["accessToken"] = null;
//     return config;
//   }

//   if (config.headers && token) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//     return config;
//   }
//   return config;
// });

// client.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     console.log(error);

//     const originConfig = error.config;

//     if (error.response && error.response.status === 401) {
//       try {
//         const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/user/etc/refresh`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${getCookie("accessToken")}`,
//           },
//           withCredentials: true,
//         });
//         if (data) {
//           setCookie("accessToken", data.data.data, {});
//           return await client.request(originConfig);
//         }
//       } catch (error: any) {
//         if (error.response.data.message === "새롭게 로그인 필요") {
//           alert("Token expired, please log in again.\n토큰이 만료되어 다시 로그인 바랍니다.");
//           removeCookie("accessToken", { path: "/" });
//           window.location.replace("/login");
//         }
//       }
//       return Promise.reject(error);
//     }
//     return Promise.reject(error);
//   },
// );
