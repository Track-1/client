export interface UploadDataType {
  title: string;
  category: string;
  audioFile: File | null;
  content: string | undefined;
  keyword: Array<string>;
  jacketImage: File | Blob | FormData | null;
}
