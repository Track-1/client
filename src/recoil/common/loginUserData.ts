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

export const loginUserImg = atom<string>({
  key: "loginUserImg",
  default: "https://track1-default.s3.ap-northeast-2.amazonaws.com/default_user2.png",
  effects_UNSTABLE: [persistAtom],
});
