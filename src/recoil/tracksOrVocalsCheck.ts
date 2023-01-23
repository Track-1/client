import { atom } from "recoil";
import { Category } from "../core/constants/categoryHeader";

export const tracksOrVocalsCheck = atom({
  key: "tracksOrVocalsCheck",
  default: Category.TRACKS,
});
