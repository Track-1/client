import { atom } from "recoil";
import { Category } from "../core/common/categoryHeader";

export const tracksOrVocalsCheck = atom({
  key: "tracksOrVocalsCheck",
  default: Category.TRACKS,
});
