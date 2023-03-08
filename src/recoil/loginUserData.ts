import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const LoginUserType = atom<string>({
  key: "LoginUserType",
  effects_UNSTABLE: [persistAtom],
});

export const LoginUserId = atom<number>({
  key: "LoginUserId",
  effects_UNSTABLE: [persistAtom],
});
