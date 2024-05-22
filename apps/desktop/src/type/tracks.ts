export interface FilteredTrackParamsType {
  page: number;
  limit: number;
  categ: string[];
}

export interface FilteredTrackType {
  trackId: string;
  trackImageFile: string;
  trackAudioFile: string;
  trackTitle: string;
  trackUserId: string;
  trackUserName: string;
  trackKeyword: string[];
  trackCategory: string;
  trackAudioFileLength: string;
}

export interface FilteredTrackListType {
  trackList: FilteredTrackType[];
}

export interface TrackDetailType {
  trackId: string;
  trackImageFile: string;
  trackAudioFile: string;
  trackAudioFileName: string;
  trackTitle: string;
  trackUserName: string;
  trackUserId: string;
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
