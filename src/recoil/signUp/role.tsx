import { atom } from "recoil";
import { ROLE } from "../../core/signUp/roleType";

export const signupRole = atom({
  key: "signupRole",
  default: ROLE.PRODUCER,
});
