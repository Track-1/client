import axios from "axios";
import { useRecoilValue } from "recoil";
const token = useRecoilValue;

//서버통신 함수
export const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
