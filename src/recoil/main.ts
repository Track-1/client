import { atom } from "recoil";

export const UserType = atom<string>({
  key: "userType",
  default: "",
});
