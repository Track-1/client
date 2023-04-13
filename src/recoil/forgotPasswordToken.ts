import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const ForgotPasswordToken = atom({
  key: "ForgotPasswordToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
