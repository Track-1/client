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


export const LoginUserImg = atom<string>({
  key: "LoginUserImg",
  default: "https://track1-default.s3.ap-northeast-2.amazonaws.com/default_user2.png",
  effects_UNSTABLE: [persistAtom],
});

