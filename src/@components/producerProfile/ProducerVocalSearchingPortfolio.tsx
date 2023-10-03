import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PortfolioPauseIc, PortfolioPlayIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import usePlaySelectedTrack from "../../hooks/common/usePlaySelectedTrack";
import { useGetProducerProfile } from "../../hooks/queries/mypage";
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

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: producerVocalSearchings.trackImageFile,
      title: producerVocalSearchings.trackTitle,
      userName: producerProfile?.userProfile.userName,
    });
  }, [playingTrack]);

  return (
    <ImageContainer onMouseEnter={hoverTrack} onMouseLeave={unhoverTrack}>
      <ImageWrapper className="image-wrapper">
        <Image src={producerVocalSearchings.trackImageFile} alt="포트폴리오 이미지" className="image" />
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

const ImageContainer = styled.div`
  display: flex;
  width: 21.8rem;
  height: 21.8rem;
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

const ImageWrapper = styled.div`
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
