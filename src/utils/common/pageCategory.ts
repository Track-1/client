import { Category } from "../../core/constants/categoryHeader";

export function isTracksPage(tracksOrVocals: string) {
  return tracksOrVocals === Category.TRACKS;
}

export function isVocalsPage(tracksOrVocals: string) {
  return tracksOrVocals === Category.VOCALS;
}
