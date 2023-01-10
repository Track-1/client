export interface UploadData {
  title: string;
  category: string;
  wavFile: File | null;
  comment: string;
  keyword: string[];
  jacketImage: File;
}
