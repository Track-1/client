import styled from "styled-components";
import { PortfolioPropsType } from "../../type/profilePropsType";
import {VocalPortfolioTitleTextIc,ProducerPortfolioTitleTextIc,UploadButtonIc,EllipsisIc} from "../../assets"
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';

export default function PortfoliosInform(props:PortfolioPropsType) {
  const isMe=props.isMe;
  const hoverId=props.hoverId;
  const clickId=props.clickId;
  const porftolios=props.portfolios;
  const portfolioHoverInformation=porftolios.filter((portfolio) => portfolio.id === hoverId)[0];
  const portfolioClickInformation=porftolios.filter((portfolio) => portfolio.id === clickId)[0];
  const tracksOrVocals=useRecoilValue(tracksOrVocalsCheck)
  const isBool=hoverId===clickId?true:false;
  const portfolioInforms=!isBool&&hoverId!==-1?portfolioHoverInformation:portfolioClickInformation

  function clickEllipsis(){
    console.log("더보기 버튼 클릭")
  }

  return (
    <>
    <PortfolioInformWrapper>
    {isMe&&<UploadButtonIc/>}
    {(portfolioClickInformation&&portfolioInforms)&&(
      <InformWrapper>
      <InformTitleWrapper>
      {portfolioInforms.isTitle&&tracksOrVocals==="Tracks"&&<ProducerPortfolioTitleTextIc/>}
      {portfolioInforms.isTitle&&tracksOrVocals==="Vocals"&&<VocalPortfolioTitleTextIc/>}
      {isMe&&isBool&&<EllipsisIc onClick={clickEllipsis}/>}
      </InformTitleWrapper>
      <InformTitle>{portfolioInforms.title}</InformTitle>
      <InformCategory>{portfolioInforms.category}</InformCategory>
      <InformContent>{portfolioInforms.content}</InformContent>
      <InformTagWrapper>
      {portfolioInforms.keyword.map((tag, idx)=>(<InformTag key={idx} textLength={tag.length}>#{tag}</InformTag>))}
      </InformTagWrapper>
      </InformWrapper>
    )}   
    </PortfolioInformWrapper>
    </>
  )
}

const PortfolioInformWrapper=styled.section`
  width: 38.1rem;
  margin-left: 87rem;
`

const InformWrapper=styled.article`
`

const InformTitleWrapper=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
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