import {
  CategoryIdType,
  CategoryType,
  EventCategoryIdType,
  EventCategoryType,
  EventUpperCategoryType,
  UpperCategoryType,
} from '../../type/common/category';

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

export const ExtendsCategoryId: Record<UpperCategoryType, CategoryIdType> = {
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

export const CategoryId: Record<UpperCategoryType, CategoryIdType> = {
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

export const EventLowerCategoryId: Record<EventCategoryType, EventCategoryIdType> = {
  'R&B': '0',
  Hiphop: '1',
  Ballad: '2',
  Pop: '3',
  Rock: '4',
  EDM: '5',
  JAZZ: '6',
  House: '7',
  Funk: '8',
  Korea: '10',
  Global: '11',
} as const;

export const EventCategoryId: Record<EventUpperCategoryType, EventCategoryIdType> = {
  'R&B': '0',
  HIPHOP: '1',
  BALLAD: '2',
  POP: '3',
  ROCK: '4',
  EDM: '5',
  JAZZ: '6',
  HOUSE: '7',
  FUNK: '8',
  KOREA: '10',
  GLOBAL: '11',
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

export const CategoryText: Record<UpperCategoryType, CategoryType> = {
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

export const EventCategoryText: Record<EventUpperCategoryType, EventCategoryType> = {
  'R&B': 'R&B',
  HIPHOP: 'Hiphop',
  BALLAD: 'Ballad',
  POP: 'Pop',
  ROCK: 'Rock',
  EDM: 'EDM',
  JAZZ: 'JAZZ',
  HOUSE: 'House',
  FUNK: 'Funk',
  KOREA: 'Korea',
  GLOBAL: 'Global',
} as const;

export const ReversedCategoryId: Record<CategoryIdType, CategoryType> = {
  0: 'R&B',
  1: 'Hiphop',
  2: 'Ballad',
  3: 'Pop',
  4: 'Rock',
  5: 'EDM',
  6: 'JAZZ',
  7: 'House',
  8: 'Funk',
} as const;

export const EventReversedCategoryId: Record<EventCategoryIdType, EventCategoryType> = {
  0: 'R&B',
  1: 'Hiphop',
  2: 'Ballad',
  3: 'Pop',
  4: 'Rock',
  5: 'EDM',
  6: 'JAZZ',
  7: 'House',
  8: 'Funk',
  10: 'Korea',
  11: 'Global',
} as const;
