import { atom } from "recoil";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

export const joinUserData = atom<JoinUserDataPropsType>({
  key: "joinUserData",
  default: {
    imageFile: new FormData(),
    ID: "",
    PW: "",
    name: "",
    isAgree: "",
  },
});
