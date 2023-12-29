import { CategoryType, UpperCategoryType } from '../../type/common/category';

export const Categories: CategoryType[] = ['R&B', 'Hiphop', 'Ballad', 'Pop', 'Rock', 'EDM', 'JAZZ', 'House', 'Funk'];



export const UpperCategories: UpperCategoryType[] = [
  'R&B',
  'HIPHOP',
  'BALLAD',
  'POP',
  'ROCK',
  'EDM',
  'JAZZ',
  'HOUSE',
  'FUNK',
];

export const LowerCategoryId: Record<CategoryType, string> = {
  'R&B': '0',
  Hiphop: '1',
  Ballad: '2',
  Pop: '3',
  Rock: '4',
  EDM: '5',
  JAZZ: '6',
  House: '7',
  Funk: '8',
} as const;

export const CategoryId: Record<UpperCategoryType, string> = {
  'R&B': '0',
  HIPHOP: '1',
  BALLAD: '2',
  POP: '3',
  ROCK: '4',
  EDM: '5',
  JAZZ: '6',
  HOUSE: '7',
  FUNK: '8',
} as const;

export const CategoryBoolean: Record<UpperCategoryType, boolean> = {
  'R&B': false,
  HIPHOP: false,
  BALLAD: false,
  POP: false,
  ROCK: false,
  EDM: false,
  JAZZ: false,
  HOUSE: false,
  FUNK: false,
} as const;

export const CategoryText: Record<UpperCategoryType, string> = {
  'R&B': 'R&B',
  HIPHOP: 'Hiphop',
  BALLAD: 'Ballad',
  POP: 'Pop',
  ROCK: 'Rock',
  EDM: 'EDM',
  JAZZ: 'JAZZ',
  HOUSE: 'House',
  FUNK: 'Funk',
} as const;
