import { CategoryIdType } from "../../type/CategoryChecksType";

// export enum Categories {
//   "R&B" = "R&B",
//   HIPHOP = "Hiphop",
//   BALLAD = "Ballad",
//   POP = "Pop",
//   ROCK = "Rock",
//   EDM = "EDM",
//   JAZZ = "JAZZ",
//   HOUSE = "House",
//   FUNK = "Funk",
// }

export const Categories: string[] = ["R&B", "Hiphop", "Ballad", "Pop", "Rock", "EDM", "JAZZ", "House", "Funk"];

export const CategoryId: CategoryIdType = {
  "R&B": "0",
  HIPHOP: "1",
  BALLAD: "2",
  POP: "3",
  ROCK: "4",
  EDM: "5",
  JAZZ: "6",
  HOUSE: "7",
  FUNK: "8",
  EVENT: "9",
};

export const CategoryDropdown: CategoryIdType = {
  "r&b": "R&B",
  hiphop: "Hiphop",
  ballad: "Ballad",
  pop: "Pop",
  rock: "Rock",
  edm: "EDM",
  jazz: "JAZZ",
  house: "House",
  funk: "Funk",
  event: "event",
};

export const CategoryText: CategoryIdType = {
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
};
