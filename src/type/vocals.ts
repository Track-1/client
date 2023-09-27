export interface FilteredVocalsParamsType {
  page: number;
  limit: number;
  categ: string[];
  trackSearch: boolean;
}

interface FilteredVocalType {
  userId: number;
  userImageFile: string;
  userAudioFile: string;
  userName: string;
  userTrackSearch: boolean;
  userCategory: string[];
  userKeyword: string[];
  userCategoryNum: number;
  userTitle: string;
  userAudioFileLength: number;
}

export type FilteredVocalListType = {
  vocalList: FilteredVocalType[];
  hasNextPage: boolean;
};
