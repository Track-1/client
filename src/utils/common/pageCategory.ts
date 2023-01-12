import { Category } from "../../core/common/categoryHeader";

export function isTracksPage(tracksOrVocals: string) {
  return tracksOrVocals === Category.TRACKS;
}

export function isVocalsPage(tracksOrVocals: string) {
  return tracksOrVocals === Category.VOCALS;
}
