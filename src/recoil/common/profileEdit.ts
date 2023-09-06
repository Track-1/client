import { atom } from "recoil";

export const profileEdit = atom({
  key: "profileEdit",
  default: {
    userContact: "",
    userCategory: [],
    userKeyword: [],
    userIntroduction: "",
  },
});
