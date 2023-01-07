import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PauseBtnIc, PortfolioPlayBtnIc } from "../../assets";
import { ProducerPortfolioType } from "../../type/producerProfile";
import PortfoliosInform from "../@common/portfoliosInform";

interface PropsType {
  portfolioData: ProducerPortfolioType[];
  isMe: boolean;
  profileState: string;
}

export default function ProducerPortFolioList(props: PropsType) {
  const { portfolioData, isMe, profileState } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [clickedIndex, setClickedIndex] = useState<number>(-1);

  function hoverPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function hoverOutPortfolio() {
    setHoveredIndex(-1);
  }

  return (
    <>
    <ProfileListContainer>
      {portfolioData.map((portfolio, index) => {
        return (
          <PortfolioBox
            key={portfolio.id}
            isLarge={index === 0 || clickedIndex === portfolio.id}
            onMouseEnter={() => hoverPortfolio(portfolio.id)}
            onMouseLeave={hoverOutPortfolio}
            index={index}
            profileState={profileState}
            onClick={() => setClickedIndex(portfolio.id)}>
            <div>
              <PortfolioImage
                src={portfolio.jacketImage}
                isLarge={index === 0 || clickedIndex === portfolio.id}
                index={index}
                profileState={profileState}
              />
            </div>
            {index === 0 && hoveredIndex === portfolio.id && <PortfolioPlayBtnIcon />}
            {hoveredIndex === portfolio.id && <PauseBtnIcon />}
            {index === 0 &&
              hoveredIndex !== portfolio.id &&
              clickedIndex !== null &&
              clickedIndex !== portfolio.id && <AudioTitle>{portfolio.title}</AudioTitle>}
            {index !== 0 && <AudioTitle>{portfolio.title}</AudioTitle>}
          </PortfolioBox>
        );
      })}
    </ProfileListContainer>
    {portfolioData&&
    (<InformWrapper>
    <PortfoliosInform isMe={isMe} hoverId={hoveredIndex} clickId={clickedIndex} portfolios={portfolioData} profileState={profileState}/>
    </InformWrapper>)}
    </>
  );
}

const InformWrapper=styled.div`
  margin-left: -77.2rem;
`

const ProfileListContainer = styled.section`
  width: 47.8rem;

  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-left: -16rem;
  margin-top: 23.3rem;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioBox = styled.article<{ isLarge: boolean; index: number, profileState:string }>`
  height: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem;
  width: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem;
  position: relative;

  border-radius: 50%;

  overflow: hidden;

  margin-top: ${({ index,profileState }) => (index === 0 && profileState!=="Vocal Searching" ? 3 : 4)}rem;
  margin-top: ${({ index,profileState }) => (index === 0 && profileState==="Vocal Searching" &&13)}rem;

  :hover {
      box-shadow:0 0 4rem ${({ theme }) => theme.colors.sub1};

  }
`;

const PortfolioImage = styled.img<{ isLarge: boolean; index: number, profileState:string }>`
  height: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem;
  width: ${({ isLarge,profileState }) => (isLarge&&profileState!=="Vocal Searching" ? 42 : 21.8)}rem;

  :hover {
    filter: blur(${({ index }) => index === 0 && 3.5}rem);
    opacity: ${({ index }) => index !== 0 && 1};
  }

  opacity: ${({ index }) => (index === 0 ? 1 : 0.2)};
`;

const PortfolioPlayBtnIcon = styled(PortfolioPlayBtnIc)`
  height: 5.2rem;
  width: 5.2rem;

  position: absolute;
  pointer-events: none;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PauseBtnIcon = styled(PauseBtnIc)`
  height: 5.2rem;
  width: 5.2rem;

  position: absolute;
  pointer-events: none;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AudioTitle = styled.h1`
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.id}

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
