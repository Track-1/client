import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePlaySelectedTrack from "../../hooks/common/usePlaySelectedTrack";
import { useGetProducerProfile } from "../../hooks/queries/mypage";
import { clickedProfileId, hoveredProfileId } from "../../recoil/common/profile";
import { ProducerVocalSearchingType, UserPortfolioType } from "../../type/profile";

interface ProducerVocalSearchingPortfolioProps {
  producerVocalSearchings: ProducerVocalSearchingType;
  playingTrack: UserPortfolioType["portfolioId"] | null;
  selectTrack: (trackId: UserPortfolioType["portfolioId"]) => void;
}

export default function ProducerVocalSearchingPortfolio(props: ProducerVocalSearchingPortfolioProps) {
  const { producerVocalSearchings, playingTrack, selectTrack } = props;
  const { contextPlaying, getPlayerInfo, showPlayer, ...playerContext } = useContext(PlayerContext);
  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    playerContext,
    producerVocalSearchings.trackAudioFile,
    producerVocalSearchings.trackId,
    selectTrack,
  );
  const isSelected = playingTrack === producerVocalSearchings.trackId;
  const { id } = useParams();
  const { producerProfile } = useGetProducerProfile(Number(id));
  const [hoverId, setHoverId] = useRecoilState(hoveredProfileId);
  const [clickId, setClickId] = useRecoilState(clickedProfileId);
  const isBig = isSelected && showPlayer;

  function handlePlaying(isPause: boolean) {
    setClickId(producerVocalSearchings.trackId);
    isPause ? stopAudioItem() : playAudioItem();
  }

  function handleHoverTrack() {
    hoverTrack();
    setHoverId(producerVocalSearchings.trackId);
  }

  function handleUnhoverTrack() {
    unhoverTrack();
    setHoverId(-1);
  }

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: producerVocalSearchings.trackImageFile,
      title: producerVocalSearchings.trackTitle,
      userName: producerProfile?.userProfile.userName,
    });
  }, [playingTrack]);

  return (
    <ImageContainer onMouseEnter={handleHoverTrack} onMouseLeave={handleUnhoverTrack} isBig={isBig}>
      <ImageWrapper className="image-wrapper" isBig={isBig}>
        <Title className="title" isLight={isSelected && isSelected && showPlayer && innerPlaying && contextPlaying}>
          {producerVocalSearchings.trackTitle}
        </Title>
        <Image
          src={producerVocalSearchings.trackImageFile}
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

      box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub1};
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
  width: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
  height: ${({ isBig }) => (isBig ? 42 : 21.8)}rem;
  border-radius: 50%;

  cursor: pointer;
`;

const Image = styled.img<{ isLight: boolean }>`
  border-radius: 50%;

  object-fit: cover;

  width: 100%;
  height: 100%;

  opacity: ${({ isLight }) => !isLight && 0.4};

  cursor: pointer;
`;

const Title = styled.h1<{ isLight: boolean }>`
  width: 14rem;

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

  text-align: center;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
