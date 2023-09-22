import { useState } from "react";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";

interface VocalBigPortfolioProps {
  portfolioId: number;
  portfolioImageFile: string;
  portfolioAudioFile: string;
}

export default function VocalBigPortfolio(props: VocalBigPortfolioProps) {
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
    <BigImageContainer onMouseEnter={handleHoverImage} onMouseLeave={handleNoneHover}>
      <BigImageWrapper className="image-wrapper">
        <Image src={portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </BigImageWrapper>
      {!isPlay ? hover !== -1 && <PortfolioPauseIcon /> : hover !== -1 && <PortfolioPlayIcon />}
    </BigImageContainer>
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

const BigImageContainer = styled.div`
  display: flex;
  width: 42.8rem;
  height: 42.8rem;
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

const BigImageWrapper = styled.div`
  display: inline-block;

  overflow: hidden;
  width: 32rem;
  height: 32rem;
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

  margin-left: -8rem;
  margin-top: -8rem;

  width: 150%;
  height: 150%;

  cursor: pointer;
`;
