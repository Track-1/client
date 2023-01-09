export interface VocalPortfolioType {
  id: number;
  jacketImage: string;
  beatWavFile: string;
  title: string;
  content: string;
  keyword: string[];
  category: string;
  wavFileLength: number;
}

export interface VocalProfileType {
  profileImage: string;
  name: string;
  contact: string;
  category: string[];
  keyword: string[];
  introduce: string;
  isSelected: boolean;
}
