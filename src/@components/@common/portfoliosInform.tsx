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
    {portfolioInformation&&portfolioInformation.isTitle&&tracksOrVocals==="Tracks"&&<ProducerPortfolioTitleTextIc/>}
    {portfolioInformation&&portfolioInformation.isTitle&&tracksOrVocals==="Vocals"&&<VocalPortfolioTitleTextIc/>}
    </>
  )
}
