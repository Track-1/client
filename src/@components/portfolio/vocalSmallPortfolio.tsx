import { useState } from "react";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";

interface VocalSmallPortfolioProps {
  portfolioId: number;
  portfolioImageFile: string;
  portfolioAudioFile: string;
}

export default function VocalSmallPortfolio(props: VocalSmallPortfolioProps) {
  const { portfolioId, portfolioImageFile, portfolioAudioFile } = props;
  // 플레이어 붙이기
  const isPlay = true;
  const [hover, setHover] = useState(-1);

  function handleHoverImage() {
    setHover(portfolioId);
  }

  function handleNoneHover() {
    setHover(-1);
  }

  return (
    <SmallImageContainer onMouseEnter={handleHoverImage} onMouseLeave={handleNoneHover}>
      <SmallImageWrapper className="image-wrapper">
        <Image src={portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </SmallImageWrapper>
      {!isPlay ? hover !== -1 && <PortfolioPauseIcon /> : hover !== -1 && <PortfolioPlayIcon />}
    </SmallImageContainer>
  );
}

const PortfolioPauseIcon = styled(PortfolioPauseIc)`
  width: 5.2rem;
  height: 5.2rem;
  position: absolute;

  cursor: pointer;
`;

const PortfolioPlayIcon = styled(PortfolioPlayIc)`
  width: 5.2rem;
  height: 5.2rem;
  position: absolute;
  cursor: pointer;
`;

const SmallImageContainer = styled.div`
  display: flex;
  width: 22rem;
  height: 22rem;
  justify-content: center;
  align-items: center;

  &:hover {
    .image-wrapper {
      background-color: rgba(13, 14, 17, 0.5);

      box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub2};
    }
    .image {
      filter: blur(3.5rem);
    }
  }
`;

const SmallImageWrapper = styled.div`
  display: inline-block;

  overflow: hidden;
  width: 16.7rem;
  height: 16.7rem;
  border-radius: 3rem;

  transform: rotate(-45deg);

  /* margin: 12rem 0 0 12rem; */
  /* margin-bottom: 12rem; */

  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 3rem;

  transform: rotate(45deg);
  object-fit: cover;

  margin-left: -3rem;
  margin-top: -3rem;

  width: 135%;
  height: 135%;

  cursor: pointer;
`;
