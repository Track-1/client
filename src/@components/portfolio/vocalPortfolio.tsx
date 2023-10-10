import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePlaySelectedTrack from "../../hooks/common/usePlaySelectedTrack";
import { useGetVocalProfile } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import { UserPortfolioType } from "../../type/profile";

interface VocalBigPortfolioProps {
  vocalPortfolios: UserPortfolioType;
  isFirst: boolean;
  playingTrack: UserPortfolioType["portfolioId"] | null;
  selectTrack: (trackId: UserPortfolioType["portfolioId"]) => void;
}

export default function VocalPortfolio(props: VocalBigPortfolioProps) {
  const { vocalPortfolios, isFirst, playingTrack, selectTrack } = props;
  const { contextPlaying, getPlayerInfo, showPlayer, ...playerContext } = useContext(PlayerContext);
  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    playerContext,
    vocalPortfolios.portfolioAudioFile,
    vocalPortfolios.portfolioId,
    selectTrack,
  );
  const isSelected = playingTrack === vocalPortfolios.portfolioId;
  const isBig = isFirst || (isSelected && showPlayer);
  const { id } = useParams();
  const { vocalProfile } = useGetVocalProfile(Number(id));
  const [hoverId, setHoverId] = useRecoilState(hoveredProfileId);
  const [clickId, setClickId] = useRecoilState(clickedProfileId);

  function handlePlaying() {
    setClickId(vocalPortfolios.portfolioId);
  }

  function handleHoverTrack() {
    hoverTrack();
    setHoverId(vocalPortfolios.portfolioId);
  }

  function handleUnhoverTrack() {
    unhoverTrack();
    setHoverId(-1);
  }

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: vocalPortfolios.portfolioImageFile,
      title: vocalPortfolios.portfolioTitle,
      userName: vocalProfile?.userProfile.userName,
    });
  }, [playingTrack]);

  return (
    <ImageContainer
      onMouseEnter={handleHoverTrack}
      onMouseLeave={handleUnhoverTrack}
      onClick={handlePlaying}
      isBig={isBig}>
      <ImageWrapper className="image-wrapper" isBig={isBig}>
        <Image src={vocalPortfolios.portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </ImageWrapper>
      {(isHovered || (isSelected && showPlayer)) &&
        (innerPlaying && contextPlaying ? (
          <PortfolioPauseIcon onClick={stopAudioItem} />
        ) : (
          <PortfolioPlayIcon onClick={playAudioItem} />
        ))}
    </ImageContainer>
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

const ImageContainer = styled.div<{ isBig: boolean }>`
  display: flex;
  width: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
  height: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
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

const ImageWrapper = styled.div<{ isBig: boolean }>`
  display: inline-block;

  overflow: hidden;
  width: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
  height: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
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
