import styled from "styled-components";
import { PortfolioPropsType } from "../../type/profilePropsType";
import {VocalPortfolioTitleTextIc,ProducerPortfolioTitleTextIc,UploadButtonIc,EllipsisIc} from "../../assets"
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';
import { useEffect, useRef, useState } from 'react';
import PortfolioUpdateModal from "./portfolioUpdateModal";
import PortfoiloViewMoreButton from "./portfoiloViewMoreButton"

export default function PortfoliosInform(props:PortfolioPropsType) {
  const isMe=props.isMe;
  const hoverId=props.hoverId;
  const clickId=props.clickId;
  const porftolios=props.portfolios;
  const profileState=props.profileState;
  const portfolioHoverInformation=porftolios.filter((portfolio) => portfolio.id === hoverId)[0];
  const portfolioClickInformation=porftolios.filter((portfolio) => portfolio.id === clickId)[0];
  const tracksOrVocals=useRecoilValue(tracksOrVocalsCheck)
  const isBool=hoverId===clickId?true:false;
  const portfolioInforms=!isBool&&hoverId!==-1?portfolioHoverInformation:portfolioClickInformation
  const isTitle=portfolioInforms&&portfolioInforms.isTitle
  const [openModal, setOpenModal]=useState<boolean>(false)
  const modalRef = useRef<HTMLDivElement>(null);

  function clickEllipsis(){
    setOpenModal(true)
  }

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openModal && !modalRef.current?.contains(e.target)) {
        setOpenModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [openModal]);

  return (
    <>
    {profileState==="Vocal Searching"&&<PortfoiloViewMoreButton/>}
    <PortfolioInformWrapper>
    {isMe&&<UploadButtonIc/>}
    {(portfolioClickInformation&&portfolioInforms)&&(
      <InformWrapper>
      <InformTitleWrapper>
      {isTitle&&tracksOrVocals==="Tracks"&&<ProducerPortfolioTitleTextIc/>}
      {isTitle&&tracksOrVocals==="Vocals"&&<VocalPortfolioTitleTextIc/>}
      {isMe&&!(!isBool&&hoverId!==-1)&&(
      <>
        <EllipsisIcon onClick={clickEllipsis}/>
        {openModal&&<PortfolioUpdateModal isTitle={isTitle} ref={modalRef}/>}
        </>
      )}

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

const ModalWrapper=styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  position: absolute;
  left: 105rem;
  margin-top: 15rem;

  width: 20.1rem;

  ${({ theme }) => theme.fonts.comment}
  color:${({ theme }) => theme.colors.white};
  background-color:${({ theme }) => theme.colors.gray4};
  border-radius: 0.5rem;
`

const ModalBox=styled.div<{underline:boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 20.1rem;
  height:5.6rem;
  padding: 1.1rem 1.9rem;
  border-bottom:0.1rem solid ${({ underline,theme }) => underline?theme.colors.gray3:theme.colors.gray4};
`

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

const EllipsisIcon=styled(EllipsisIc)`
  cursor: pointer;
`