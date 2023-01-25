export interface UploadInfoDataType {
  title: string;
  category: string;
  wavFile: File | null;
  introduce: string;
  keyword: string[];
  jacketImage: File | Blob | FormData | null;
}
