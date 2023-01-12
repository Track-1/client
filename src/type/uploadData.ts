export interface UploadData {
  title: string;
  category: string;
  wavFile: File | null;
  introduce: string;
  keyword: string[];
  jacketImage: File | FormData;
}
