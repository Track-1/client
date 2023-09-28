import { useState } from "react";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { UserPortfolioType } from "../../type/profile";

interface ProducerSmallPortfolioProps {
  producerPortfolios: UserPortfolioType;
}

export default function ProducerSmallPortfolio(props: ProducerSmallPortfolioProps) {
  const { producerPortfolios } = props;
  // 플레이어 붙이기
  const isPlay = true;
  const [hover, setHover] = useState(-1);

  function handleHoverImage() {
    setHover(producerPortfolios.portfolioId);
  }

  function handleNoneHover() {
    setHover(-1);
  }

  return (
    <BigImageContainer onMouseEnter={handleHoverImage} onMouseLeave={handleNoneHover}>
      <BigImageWrapper className="image-wrapper">
        <Image src={producerPortfolios.portfolioImageFile} alt="포트폴리오 이미지" className="image" />
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
  width: 21.8rem;
  height: 21.8rem;
  justify-content: center;
  align-items: center;

  &:hover {
    .image-wrapper {
      background-color: rgba(13, 14, 17, 0.5);

      box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub1};
    }
    .image {
      filter: blur(3.5rem);
    }
  }
`;

const BigImageWrapper = styled.div`
  display: inline-block;

  overflow: hidden;
  width: 21.8rem;
  height: 21.8rem;
  border-radius: 50%;

  /* margin: 12rem 0 0 12rem; */
  /* margin-bottom: 12rem; */

  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 50%;

  object-fit: cover;

  width: 100%;
  height: 100%;

  cursor: pointer;
`;
