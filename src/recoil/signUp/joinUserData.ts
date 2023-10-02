import { atom } from "recoil";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";

export const joinUserData = atom<JoinUserDataPropsType>({
  key: "joinUserData",
  default: {
    userImageFile: new FormData(),
    userEmail: "",
    userPw: "",
    userName: "",
    userMarketing: "",
  },
});
