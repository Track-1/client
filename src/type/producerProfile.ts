export interface ProducerPortfolioType {
  producerPortfolioId: number;
  jacketImage: string;
  beatWavFile: string;
  title: string;
  content: string;
  keyword: string[];
  category: string;
  wavFileLength: number;
  isTitle: boolean;
}

export interface ProducerProfileType {
  profileImage: string;
  name: string;
  contact: string;
  category: string[];
  keyword: string[];
  introduce: string;
}
