export interface UploadInfoDataType {
  title: string;
  category: string;
  audioFile: File | null;
  content: string | undefined;
  keyword: Array<string>;
  jacketImage: File | Blob | FormData;
}
