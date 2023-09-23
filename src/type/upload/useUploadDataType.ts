export interface UploadDataType {
  title: string;
  category: string;
  audioFile: File | null;
  audioFileName: string;
  introduction: string;
  keyword: Array<string>;
  imageFile: File | Blob | null;
  imageFileSame?: boolean;
}
