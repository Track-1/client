export interface CategoryChecksType {
  categId: number;
  selected: boolean;
}

export interface CategorySelectType {
  [key: string]: boolean;
}

export type CategoriesDropdownType = "R&B" | "Hiphop" | "Ballad" | "Pop" | "Rock" | "EDM" | "JAZZ" | "House" | "Funk";
