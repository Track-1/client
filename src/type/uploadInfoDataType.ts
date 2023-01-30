export interface UploadInfoDataType {
  title: string;
  category: string;
  wavFile: File | null;
  introduce: string;
  keyword: Array<string>;
  jacketImage: File | Blob | FormData | null;
}

export interface UploadInfoRefType {
  introduceRef: React.MutableRefObject<HTMLTextAreaElement | null> | null;
}
