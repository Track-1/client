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

  function handlePlaying(isPause: boolean) {
    setClickId(vocalPortfolios.portfolioId);
    isPause ? stopAudioItem() : playAudioItem();
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
    <ImageContainer onMouseEnter={handleHoverTrack} onMouseLeave={handleUnhoverTrack} isBig={isBig}>
      <ImageWrapper className="image-wrapper" isBig={isBig}>
        <Title className="title" isLight={isSelected && isSelected && showPlayer && innerPlaying && contextPlaying}>
          {vocalPortfolios.portfolioTitle}
        </Title>
        <Image
          src={vocalPortfolios.portfolioImageFile}
          alt="포트폴리오 이미지"
          className="image"
          isLight={isSelected && isSelected && showPlayer && innerPlaying && contextPlaying}
        />
      </ImageWrapper>
      {isHovered && (
        <>
          {isSelected && isSelected && showPlayer && innerPlaying && contextPlaying ? (
            <PortfolioPauseIcon onClick={() => handlePlaying(true)} />
          ) : (
            <PortfolioPlayIcon onClick={() => handlePlaying(false)} />
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

      box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub2};
    }
    .image {
      filter: blur(3.5rem);
    }
    .title {
      display: none;
    }
  }
`;

const ImageWrapper = styled.div<{ isBig: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
  width: ${({ isBig }) => (isBig ? 30.2 : 15.4)}rem;
  height: ${({ isBig }) => (isBig ? 30.2 : 15.4)}rem;
  border-radius: 3rem;

  transform: rotate(-45deg);

  cursor: pointer;
`;

const Image = styled.img<{ isLight: boolean }>`
  border-radius: 3rem;

  transform: rotate(45deg);
  object-fit: cover;

  width: 150%;
  height: 150%;

  opacity: ${({ isLight }) => !isLight && 0.4};
  cursor: pointer;
`;

const Title = styled.h1<{ isLight: boolean }>`
  width: 14rem;
  height: 5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;

  color: ${({ theme }) => theme.colors.gray2};
  display: ${({ isLight }) => (isLight ? "none" : "flex")};

  ${({ theme }) => theme.fonts.id}

  justify-content: center;
  align-items: center;
  position: absolute;
  overflow-wrap: break-word;

  transform: rotate(45deg);
`;
