export type CategoryType = 'R&B' | 'Hiphop' | 'Ballad' | 'Pop' | 'Rock' | 'EDM' | 'JAZZ' | 'House' | 'Funk';

export type UpperCategoryType = 'R&B' | 'HIPHOP' | 'BALLAD' | 'POP' | 'ROCK' | 'EDM' | 'JAZZ' | 'HOUSE' | 'FUNK';

export type CategorySelectedCheckType = {
  categId: number;
  selected: boolean;
};

export type CategoryIdType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

export type EventCategoryType =
  | 'R&B'
  | 'Hiphop'
  | 'Ballad'
  | 'Pop'
  | 'Rock'
  | 'EDM'
  | 'JAZZ'
  | 'House'
  | 'Funk'
  | 'Korea'
  | 'Global';

export type EventUpperCategoryType =
  | 'R&B'
  | 'HIPHOP'
  | 'BALLAD'
  | 'POP'
  | 'ROCK'
  | 'EDM'
  | 'JAZZ'
  | 'HOUSE'
  | 'FUNK'
  | 'KOREA'
  | 'GLOBAL';

export type EventCategoryIdType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '10' | '11';
