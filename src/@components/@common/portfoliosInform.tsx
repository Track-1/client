import { tracksOrVocalsCheck } from "../../recoil/tracksOrVocalsCheck"
import { useRecoilValue } from 'recoil';

interface PortfolioType{
    id:number;
    title:string;
    content:string;
    keyword:string[];
    category:string;
}

interface PortfolioPropsType{
    isMe:boolean;
    portfolioId:number;
    portfolio:PortfolioType;
}

export default function PortfoliosInform() {

  return (
    <>
    </>
  )
}
