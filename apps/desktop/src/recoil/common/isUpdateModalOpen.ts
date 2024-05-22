import { atom } from "recoil";

export const isUpdateModalOpen = atom<boolean>({
  key: "isUpdateModalOpen",
  default: false,
});
