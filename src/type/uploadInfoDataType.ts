export interface UploadInfoDataType {
  title: string;
  category: string;
  audioFile: File | null;
  introduce: string | undefined;
  keyword: Array<string>;
  jacketImage: File | Blob | FormData;
}
