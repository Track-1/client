export interface ProducerPortfolioType {
  id: number;
  jacketImage: string;
  beatWavFile: string;
  title: string;
  content: string;
  keyword: string[];
  category: string;
  wavFileLength: number;
  isTitle: boolean;
  vocalPortfolioId: number;
}

export interface ProducerProfileType {
  id: number;
  profileImage: string;
  profileImge: string;
  name: string;
  contact: string;
  category: string[];
  keyword: string[];
  introduce: string;
  isSelected: boolean;
}
