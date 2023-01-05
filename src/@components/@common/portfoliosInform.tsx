import styled from "styled-components";
import { PortfolioPropsType,PortfolioType } from "../../type/profilePropsType";
import {VocalPortfolioTitleTextIc,ProducerPortfolioTitleTextIc} from "../../assets"
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';
import { useState } from 'react';

export default function PortfoliosInform(props:PortfolioPropsType) {
  const isMe=props.isMe;
  const hoverId=props.hoverId;
  const clickId=props.clickId;
  const porftolios=props.portfolios;

  const portfolioInformation=porftolios.filter((portfolio) => portfolio.id === hoverId)[0];

  const tracksOrVocals=useRecoilValue(tracksOrVocalsCheck)

  return (
    <>
    {portfolioInformation&&(
      <InformWrapper>
      {portfolioInformation.isTitle&&tracksOrVocals==="Tracks"&&<ProducerPortfolioTitleTextIc/>}
      {portfolioInformation.isTitle&&tracksOrVocals==="Vocals"&&<VocalPortfolioTitleTextIc/>}
      <InformTitle>{portfolioInformation.title}</InformTitle>
      <InformCategory>{portfolioInformation.category}</InformCategory>
      <InformContent>{portfolioInformation.content}</InformContent>
      </InformWrapper>
    )}
    </>
  )
}

const InformWrapper=styled.section`
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