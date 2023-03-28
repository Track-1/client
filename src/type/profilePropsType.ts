export interface PortfolioType {
  beatWavFile: string;
  category: string;
  content: string;
  // isTitle:boolean;
  jacketImage: string;
  keyword: string[];
  title: string;
  id: number;
  wavFileLength: number;
  vocalPortfolioId: number;
}

export interface PortfolioPropsType {
  isMe: boolean;
  hoverId: number;
  clickId: number;
  portfolios: PortfolioType[];
  profileState: string;
  whom:string;
}

export interface PortfolioDetailPropsType {
  isMe:boolean;
  id: number;
  profileState: string;
  portfolios: PortfolioType[];
}
