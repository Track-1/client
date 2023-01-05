import styled from "styled-components";
import { PortfolioPropsType,PortfolioType } from "../../type/profilePropsType";
import {VocalPortfolioTitleTextIc,ProducerPortfolioTitleTextIc} from "../../assets"
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';

export default function PortfoliosInform(props:PortfolioPropsType) {
  const isMe=props.isMe;
  const hoverId=props.hoverId;
  const clickId=props.clickId;
  const porftolios=props.portfolios;

  const portfolioInformation=porftolios.filter((portfolio) => portfolio.id === hoverId)[0];

  const tracksOrVocals=useRecoilValue(tracksOrVocalsCheck)

  portfolioInformation&&console.log(portfolioInformation.keyword[0].length)

  return (
    <PortfolioInformWrapper>
    {portfolioInformation&&(
      <InformWrapper>
      {portfolioInformation.isTitle&&tracksOrVocals==="Tracks"&&<ProducerPortfolioTitleTextIc/>}
      {portfolioInformation.isTitle&&tracksOrVocals==="Vocals"&&<VocalPortfolioTitleTextIc/>}
      <InformTitle>{portfolioInformation.title}</InformTitle>
      <InformCategory>{portfolioInformation.category}</InformCategory>
      <InformContent>{portfolioInformation.content}</InformContent>
      <InformTagWrapper>
      {portfolioInformation.keyword.map((tag, idx)=>(<InformTag key={idx} textLength={tag.length}>#{tag}</InformTag>))}
      </InformTagWrapper>
      </InformWrapper>
    )}
    </PortfolioInformWrapper>
  )
}

const PortfolioInformWrapper=styled.section`
  width: 38.1rem;
  margin-left: 87rem;
`

const InformWrapper=styled.article`
`

const InformTitle=styled.h1`
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`

const InformCategory=styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`

const InformContent=styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};
`

const InformTag = styled.span<{textLength:number}>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 3.8rem;
  width: ${({textLength})=>textLength+6}rem;

  margin-bottom: 1rem;

  background: ${({ theme }) => theme.colors.gray4};
  border-radius: 2.1rem;

  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};
`;

const InformTagWrapper=styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap:1rem
`