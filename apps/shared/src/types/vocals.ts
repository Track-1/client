import { CategoryType } from './common/category';

export interface FilteredVocalsParamsType {
  page: number;
  limit: number;
  categ: string[];
  trackSearch: boolean;
}

export interface FilteredVocalType {
  userId: number;
  userImageFile: string;
  userAudioFile: string;
  userName: string;
  userTrackSearch: boolean;
  userCategory: CategoryType[];
  userKeyword: string[];
  userCategoryNum: number;
  userTitle: string;
  userAudioFileLength: number;
}

export type FilteredVocalListType = {
  vocalList: FilteredVocalType[];
  hasNextPage: boolean;
};

export interface PortfoliosParamsType {
  page: number;
  limit: number;
  userId: number;
}
