import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import { UserPortfolioType } from "../../type/profile";

interface VocalSmallPortfolioProps {
  vocalPortfolios: UserPortfolioType;
}

export default function VocalSmallPortfolio(props: VocalSmallPortfolioProps) {
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
    <SmallImageContainer onMouseEnter={handleHoverImage} onMouseLeave={handleNoneHover} onClick={handlePlaying}>
      <SmallImageWrapper className="image-wrapper">
        <Image src={vocalPortfolios.portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </SmallImageWrapper>
      {!isPlay ? hoverId !== -1 && <PortfolioPauseIcon /> : hoverId !== -1 && <PortfolioPlayIcon />}
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
