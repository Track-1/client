import { atom } from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom}=recoilPersist();

export const UserType = atom<string>({
  key: "UserType",
  default: "producer",
  effects_UNSTABLE:[persistAtom],
});
