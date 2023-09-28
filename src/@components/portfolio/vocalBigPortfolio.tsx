import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import { UserPortfolioType } from "../../type/profile";

interface VocalBigPortfolioProps {
  vocalPortfolios: UserPortfolioType;
}

export default function VocalBigPortfolio(props: VocalBigPortfolioProps) {
  const { vocalPortfolios } = props;
  // 플레이어 붙이기
  const isPlay = true;
  const [hoverId, setHoverId] = useState(-1);
  const [savedHoverId, setSavedHoverId] = useRecoilState(hoveredProfileId);
  const [clickId, setClickId] = useRecoilState(clickedProfileId);

  function handleHoverImage() {
    setHoverId(vocalPortfolios.portfolioId);
    setSavedHoverId(vocalPortfolios.portfolioId);
  }

  function handleNoneHover() {
    setHoverId(-1);
    setSavedHoverId(-1);
  }

  function handlePlaying() {
    setClickId(vocalPortfolios.portfolioId);
  }

  return (
    <BigImageContainer onMouseEnter={handleHoverImage} onMouseLeave={handleNoneHover} onClick={handlePlaying}>
      <BigImageWrapper className="image-wrapper">
        <Image src={vocalPortfolios.portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </BigImageWrapper>
      {!isPlay ? hoverId !== -1 && <PortfolioPauseIcon /> : hoverId !== -1 && <PortfolioPlayIcon />}
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

  margin-bottom: 5rem;

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
