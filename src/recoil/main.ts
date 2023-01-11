import { atom } from "recoil";

export const UserType = atom<string>({
  key: "UserType",
  default: "producer",
});
