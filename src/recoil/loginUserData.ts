import { atom } from "recoil";

export const LoginUserType = atom<string>({
  key: "LoginUserType",
  default: "",
});

export const LoginUserId = atom<string>({
  key: "LoginUserId",
  default: "",
});
