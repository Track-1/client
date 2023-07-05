export interface CategoryChecksType {
  categId: number;
  selected: boolean;
}

export interface CategoryIdType {
  [key: string]: string;
}

export interface CategorySelectType {
  [key: string]: boolean;
}

export type CategoriesDropdownType =
  | "R&B"
  | "Hiphop"
  | "Ballad"
  | "Pop"
  | "Rock"
  | "EDM"
  | "JAZZ"
  | "House"
  | "Funk"
  | "Event";
