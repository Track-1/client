import { atom } from "recoil";

export const isModalOpen = atom<boolean>({
  key: "isModalOpen",
  default: false,
});
