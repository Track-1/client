import styled from "styled-components";
import { PortfolioPropsType } from "../../type/profilePropsType";
import {VocalPortfolioTitleTextIc,ProducerPortfolioTitleTextIc,UploadButtonIc,EllipsisIc,BlankIc,UploadButtonBlankIc} from "../../assets"
import { useRecoilValue } from "recoil";
import { tracksOrVocalsCheck } from '../../recoil/tracksOrVocalsCheck';
import { useEffect, useRef, useState } from 'react';
import PortfolioUpdateModal from "./portfolioUpdateModal";
import PortfoiloViewMoreButton from "./portfoiloViewMoreButton"
import { useNavigate } from 'react-router-dom';
import TracksProfileUploadModal from "./tracksProfileUploadModal";

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
  const portfolioInforms=(!isBool&&hoverId!==-1||isBool&&hoverId!==-1)?portfolioHoverInformation:portfolioClickInformation
  const isTitle=portfolioInforms&&portfolioInforms.isTitle
  const [openEllipsisModal, setOpenEllipsisModal]=useState<boolean>(false)
  const [openUploadModal, setOpenUploadModal]=useState<boolean>(true)
  const ellipsisModalRef = useRef<HTMLDivElement>(null);
  const navigate=useNavigate()

  function clickEllipsis(){
    setOpenEllipsisModal(true)
  }

  function clickUploadButton(){
    tracksOrVocals==="Tracks"&&setOpenUploadModal(true)
    tracksOrVocals==="Vocals"&&navigate('/upload-vocal')
  }

  useEffect(() => {
    const clickOutside = (e: any) => {
      if (openEllipsisModal && !ellipsisModalRef.current?.contains(e.target)) {
        setOpenEllipsisModal(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [openEllipsisModal]);

  return (
    <PortfolioInformWrapper>
      {/* 나인 경우 업로드 버튼이 떠요 */}
    {isMe?<UploadButtonIcon onClick={clickUploadButton}/>:<UploadButtonBlankIcon/>}

    {portfolioInforms&&
      <>
      <InformWrapper>

      <InformTitleWrapper>
        {/* 누른 곡이 타이틀곡인 경우, 색깔이 다른 타이틀 아이콘이 뜹니다. 프로듀서 프로핑-보컬서칭의 경우는 타이틀곡이 아예 존재하지 않아요 */}
        {profileState==="Vocal Searching"&&<PortfoiloViewMoreButton/>}
      {isTitle&&tracksOrVocals==="Tracks"&&profileState!=="Vocal Searching"&&<ProducerPortfolioTitleTextIc/>}
      {isTitle&&tracksOrVocals==="Vocals"&&profileState!=="Vocal Searching"&&<VocalPortfolioTitleTextIc/>}
      {(!isTitle||profileState!=="Vocal Searching")&&<BlankIc/>}
      {/* 나인 경우는 더보기 버튼이 떠요, 더보기 버튼은 모달 컴포넌트로 따로 구현했어요. */}
      {isMe&&!(!isBool&&hoverId!==-1)&&(
      <>
        {<EllipsisIcon onClick={clickEllipsis}/>}
        {openEllipsisModal&&<PortfolioUpdateModal isTitle={isTitle} ref={ellipsisModalRef}/>}
        </>
      )}
      </InformTitleWrapper>
      <InformTitle>{portfolioInforms.title}</InformTitle>
      <InformCategory>{portfolioInforms.category}</InformCategory>
      </InformWrapper>

      <InformContent>{portfolioInforms.content}</InformContent>
      <InformTagWrapper>
      { portfolioInforms.keyword.map((tag, idx)=>(<InformTag key={idx} textLength={tag.length}>#{tag}</InformTag>))}
      </InformTagWrapper>
      </>
    }   
    </PortfolioInformWrapper>
  )
}

const UploadButtonIcon=styled(UploadButtonIc)`
  margin-top: 5.9rem;
  margin-left: 12.65rem;
`

const UploadButtonBlankIcon=styled(UploadButtonBlankIc)`
  margin-top: 5.9rem;
  margin-left: 12.65rem;
`

const PortfolioInformWrapper=styled.section`
  width: 37.3rem;
  margin-left: 87rem;

  position: fixed;
  top: 0;
`

const InformWrapper=styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 40rem;
  margin-bottom: 2rem;
`

const InformTitleWrapper=styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
`

const InformTitle=styled.h1`
  width: 37.3rem;
  overflow-wrap: break-word;

  margin-top: 1.7rem;
  ${({ theme }) => theme.fonts.title};
  color: ${({ theme }) => theme.colors.white};
`

const InformCategory=styled.p`
  ${({ theme }) => theme.fonts.hashtag};
  color: ${({ theme }) => theme.colors.gray1};

  margin-top: 0.8rem;
`

const InformContent=styled.p`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin-bottom: 2.4rem;
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