import { CategoryType } from "./common/category";

export interface FilteredTrackParamsType {
  page: number;
  limit: number;
  categ: string[];
}

export interface FilteredTrackType {
  trackId: number;
  trackImageFile: string;
  trackAudioFile: string;
  trackTitle: string;
  trackUserId: number;
  trackUserName: string;
  trackKeyword: string[];
  trackCategory: CategoryType;
  trackAudioFileLength: number;
}

export interface FilteredTrackListType {
  trackList: FilteredTrackType[];
  hasNextPage: boolean;
}

export interface TrackDetailType {
  trackId: number;
  trackImageFile: string;
  trackAudioFile: string;
  trackAudioFileName: string;
  trackTitle: string;
  trackUserName: string;
  trackUserId: number;
  userImageFile: string;
  trackIntroduction: string;
  trackKeyword: string[];
  trackCategory: string;
  userSelf: boolean;
  trackAudioFileLength: number;
  trackClosed: boolean;
}

export interface TrackDownloadType {
  trackId: number;
  trackAudioFile: string;
  trackAudioFileLength: number;
}
