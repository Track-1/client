import { useState } from "react";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";

export default function VocalBigPortfolio() {
  const isPlay = true;
  const [hover, setHover] = useState(-1);
  const portfolioImageFile =
    "https://d2ljd15ob9zy81.cloudfront.net/vocalProfileImage/1693411394697-ea250385-a73e-47a1-9046-4db5ebfb92b1.jpg?Expires=1695451892&Key-Pair-Id=K1Q4IA68MZB7BO&Signature=TYdA~201zjXoefPabPQpCsQjdn4n81nuhqxu3KE4irfOLKEW8mrizAsxn9VY1HksIyCo2RSmOfNRLLmb-phMYY-ZwxjNT0pqaMk9WfOmBsupUN6hKDlJSjtYuHDuy6thurS2fq8eQ1CwzaGYAhyT2k2ErBw4wkt24zTxG8PwCjp6NMk5cBzkaAzzm4oAPO4bOvHOETn0Hkk7xN5GENhW9vS7l6kKISexKRsGBOK6CT5zgR~7ZaMMTAU1y4hWd8lIy3Zb6Y7OQ1C9URDhkNkpcWz7cv2SxezyT-U8zVofAhIKRqjrUew7l34p1GRJWpNOCAImkHycONfRRt5VlzyJNA__";

  function handleHoverImage() {
    setHover(1);
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
