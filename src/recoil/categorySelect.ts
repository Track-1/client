import { atom } from "recoil";

export const categorySelect = atom({
  key: "categorySelect",
  default: "&categ=0&categ=1&categ=2&categ=3&categ=4&categ=5&categ=6&categ=7&categ=8",
});

export const trackSearching=atom({
  key: "trackSearching",
  default: false,
})