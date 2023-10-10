import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePlaySelectedTrack from "../../hooks/common/usePlaySelectedTrack";
import { useGetProducerProfile } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import { UserPortfolioType } from "../../type/profile";

interface ProducerBigPortfolioProps {
  producerPortfolios: UserPortfolioType;
  isFirst: boolean;
  playingTrack: UserPortfolioType["portfolioId"] | null;
  selectTrack: (trackId: UserPortfolioType["portfolioId"]) => void;
}

export default function ProducerPortfolio(props: ProducerBigPortfolioProps) {
  const { producerPortfolios, isFirst, playingTrack, selectTrack } = props;
  const { contextPlaying, getPlayerInfo, showPlayer, ...playerContext } = useContext(PlayerContext);
  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    playerContext,
    producerPortfolios.portfolioAudioFile,
    producerPortfolios.portfolioId,
    selectTrack,
  );
  const isSelected = playingTrack === producerPortfolios.portfolioId;
  const isBig = isFirst || (isSelected && showPlayer);
  const { id } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(id));
  const [hoverId, setHoverId] = useRecoilState(hoveredProfileId);
  const [clickId, setClickId] = useRecoilState(clickedProfileId);

  function handlePlaying() {
    setClickId(producerPortfolios.portfolioId);
  }

  function handleHoverTrack() {
    hoverTrack();
    setHoverId(producerPortfolios.portfolioId);
  }

  function handleUnhoverTrack() {
    unhoverTrack();
    setHoverId(-1);
  }

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: producerPortfolios.portfolioImageFile,
      title: producerPortfolios.portfolioTitle,
      userName: producerProfile?.userProfile.userName,
    });
  }, [playingTrack]);

  return (
    <ImageContainer
      onMouseEnter={handleHoverTrack}
      onMouseLeave={handleUnhoverTrack}
      onClick={handlePlaying}
      isBig={isBig}>
      <ImageWrapper className="image-wrapper" isBig={isBig}>
        <Image src={producerPortfolios.portfolioImageFile} alt="포트폴리오 이미지" className="image" />
      </ImageWrapper>
      {isHovered && (
        <>
          {isSelected && isSelected && showPlayer && innerPlaying && contextPlaying ? (
            <PortfolioPauseIcon onClick={stopAudioItem} />
          ) : (
            <PortfolioPlayIcon onClick={playAudioItem} />
          )}
        </>
      )}
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

      box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub1};
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
  border-radius: 50%;

  cursor: pointer;
`;

const Image = styled.img`
  border-radius: 50%;

  object-fit: cover;

  width: 100%;
  height: 100%;

  cursor: pointer;
`;
