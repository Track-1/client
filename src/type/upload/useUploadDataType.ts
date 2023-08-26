export interface UploadDataType {
  trackTitle: string;
  trackCategory: string;
  trackAudioFile: File | null;
  trackAudioFileName: string;
  trackIntroduction: string;
  trackKeyword: Array<string>;
  trackImageFile: File | Blob | null;
}
