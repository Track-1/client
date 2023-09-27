import { CategoryType, UpperCategoryType } from "../../type/common/category";

export const Categories: CategoryType[] = ["R&B", "Hiphop", "Ballad", "Pop", "Rock", "EDM", "JAZZ", "House", "Funk"];

export const CategoryId: Record<UpperCategoryType, string> = {
  "R&B": "0",
  HIPHOP: "1",
  BALLAD: "2",
  POP: "3",
  ROCK: "4",
  EDM: "5",
  JAZZ: "6",
  HOUSE: "7",
  FUNK: "8",
} as const;

export const CategoryBoolean: Record<UpperCategoryType, boolean> = {
  "R&B": false,
  HIPHOP: false,
  BALLAD: false,
  POP: false,
  ROCK: false,
  EDM: false,
  JAZZ: false,
  HOUSE: false,
  FUNK: false,
} as const;

export const CategoryText: Record<UpperCategoryType | "EVENT", CategoryType | "Event"> = {
  "R&B": "R&B",
  HIPHOP: "Hiphop",
  BALLAD: "Ballad",
  POP: "Pop",
  ROCK: "Rock",
  EDM: "EDM",
  JAZZ: "JAZZ",
  HOUSE: "House",
  FUNK: "Funk",
  EVENT: "Event",
} as const;
