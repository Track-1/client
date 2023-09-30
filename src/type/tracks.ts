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
  trackCategory: string;
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
  userIntroduction: string;
  userKeyword: string[];
  userCategory: string;
  userSelf: boolean;
  trackAudioFileLength: number;
  trackClosed: boolean;
}

export interface TrackDownloadType {
  trackId: number;
  trackAudioFile: string;
  trackAudioFileLength: number;
}
