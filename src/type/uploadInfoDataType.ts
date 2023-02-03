export interface UploadInfoDataType {
  title: string;
  category: string;
  wavFile: File | null;
  introduce: string | undefined;
  keyword: Array<string>;
  jacketImage: File | Blob | FormData;
}

export interface UploadInfoRefType {
  introduceRef: React.MutableRefObject<HTMLTextAreaElement | null> | null;
}
