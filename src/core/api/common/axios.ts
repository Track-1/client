import axios from "axios";

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MiwiaWF0IjoxNjc3ODcxNzIyLCJleHAiOjE2Nzc4NzUzMjJ9.yfEdEQT7LAxYA9MeQ4y50gJgmBLXJZOho_cqxuhuIlg`,
  },
});
