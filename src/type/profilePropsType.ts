export interface PortfolioType{
    beatWavFile:string;
    category:string;
    content:string;
    isTitle:boolean;
    jacketImage:string;
    keyword:string[]
    length:number
    title:string;
    id:number;
    wavFileLength:number;
  }
  
export interface PortfolioPropsType{
    isMe:boolean;
    hoverId:number;
    clickId:number;
    portfolios:PortfolioType[];
}