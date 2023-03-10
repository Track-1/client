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

export type CategoriesDropdownType = "r&b" | "hiphop" | "ballad" | "pop" | "rock" | "edm" | "jazz" | "house" | "funk";
