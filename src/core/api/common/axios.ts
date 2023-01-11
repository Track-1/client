import axios from "axios";

//서버통신 함수
export const server = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_PRODUCER_ACCESSTOKEN}`,
  },
});


