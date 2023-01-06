import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { PauseBtnIc, PortfolioPlayBtnIc } from "../../assets";
import { ProducerPortfolioType } from "../../type/producerProfile";

interface PropsType {
  portfolioData: ProducerPortfolioType[];
}

export default function ProducerPortFolioList(props: PropsType) {
  const { portfolioData } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  function hoverPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function hoverOutPortfolio() {
    setHoveredIndex(null);
  }

  function clickAudioBox(id: number) {
    setClickedIndex(id);
  }

  return (
    <ProfileListContainer>
      {portfolioData.map((portfolio, index) => {
        return (
          <PortfolioBox
            key={portfolio.producerPortfolioId}
            isFocused={index === 0 || clickedIndex === portfolio.producerPortfolioId}
            onMouseEnter={() => hoverPortfolio(portfolio.producerPortfolioId)}
            onMouseLeave={hoverOutPortfolio}
            index={index}
            onClick={() => clickAudioBox(portfolio.producerPortfolioId)}>
            <div>
              <PortfolioImage
                src={portfolio.jacketImage}
                isFocused={index === 0 || clickedIndex === portfolio.producerPortfolioId}
                index={index}
              />
            </div>
            {index === 0 && hoveredIndex === portfolio.producerPortfolioId && <PortfolioPlayBtnIcon />}
            {hoveredIndex === portfolio.producerPortfolioId && <PauseBtnIcon />}
            {hoveredIndex !== portfolio.producerPortfolioId &&
              index === 0 &&
              clickedIndex !== null &&
              clickedIndex !== portfolio.producerPortfolioId && <AudioTitle>{portfolio.title}</AudioTitle>}
            {index !== 0 && <AudioTitle>{portfolio.title}</AudioTitle>}
          </PortfolioBox>
        );
      })}
    </ProfileListContainer>
  );
}

const ProfileListContainer = styled.section`
  width: 47.8rem;

  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* padding-top: 3rem; */

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioBox = styled.article<{ isFocused: boolean; index: number }>`
  height: ${({ isFocused }) => (isFocused ? 42 : 21.8)}rem;
  width: ${({ isFocused }) => (isFocused ? 42 : 21.8)}rem;
  position: relative;

  border-radius: 50%;

  overflow: hidden;

  margin-top: ${({ index }) => (index === 0 ? 3 : 4)}rem;

  :hover {
    box-shadow: ${({ index }) => index !== 0 && 0} ${({ index }) => index !== 0 && 0}
      ${({ index }) => index !== 0 && 4}rem ${({ index }) => index !== 0 && "#43ff8e"};
  }
`;

const PortfolioImage = styled.img<{ isFocused: boolean; index: number }>`
  height: ${({ isFocused }) => (isFocused ? 42 : 21.8)}rem;
  width: ${({ isFocused }) => (isFocused ? 42 : 21.8)}rem;

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
