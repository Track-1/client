export interface VocalPortfolioType {
  id: number;
  jacketImage: string;
  beatWavFile: string;
  title: string;
  content: string;
  keyword: string[];
  category: string;
  wavFileLength: number;
  vocalPortfolioId: number;
}

export interface VocalProfileType {
  profileImage: string;
  profileImge: string;
  name: string;
  contact: string;
  category: string[];
  keyword: string[];
  introduce: string;
  isSelected: boolean;
}
