import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginUserType = atom<string>({
  key: "loginUserType",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loginUserId = atom<number>({
  key: "loginUserId",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});
