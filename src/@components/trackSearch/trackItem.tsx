import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FilteredTrackType } from "../../type/tracks";

const Container = styled.li<{ isHovered: boolean }>`
  display: flex;
  align-items: center;

  width: 154.3rem;
  height: 12.1rem;

  margin-left: 6.6rem;
  margin-bottom: 0.7rem;

  border: 0.15rem solid transparent;
  background-image: linear-gradient(
      ${({ isHovered, theme }) => isHovered && theme.colors.sub3},
      ${({ isHovered, theme }) => isHovered && theme.colors.sub3}
    ),
    linear-gradient(
      to right,
      ${({ isHovered, theme }) => isHovered && theme.colors.sub1} 0%,
      ${({ isHovered, theme }) => isHovered && theme.colors.sub3} 95%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 11.7rem 0 0 11.7rem;
`;

const ThumnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.3rem;
  height: 8.3rem;

  margin-right: 2.8rem;
  margin-left: 2.4rem;

  border-radius: 6.55rem;
  overflow: hidden;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const TrackText = styled.div<{ isHovered: boolean }>`
  ${({ theme }) => theme.fonts.body1};

  padding-right: 3rem;
  margin-right: 1rem;

  color: ${({ theme }) => theme.colors.white};
  :hover {
    color: ${({ isHovered, theme }) => isHovered && theme.colors.sub1};
    cursor: pointer;
  }
`;

const TrackTitle = styled(TrackText)`
  width: 36rem;
`;

const Producer = styled(TrackText)`
  width: 21.3rem;
`;

const Category = styled(TrackText)`
  width: 20rem;
`;

const Tag = styled.span`
  display: flex;
  align-items: center;

  height: 3.8rem;

  padding: 0.7rem 1rem;
  margin: 0 0.7rem 0 0;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.hashtag};
  background: ${({ theme }) => theme.colors.gray4};
  border-radius: 21px;
`;

interface TrackItemProps {
  trackInfo: FilteredTrackType;
}

export default function TrackItem(props: TrackItemProps) {
  const { trackInfo } = props;
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  function hoverTrack() {
    setIsHovered(true);
  }

  function unhoverTrack() {
    setIsHovered(false);
  }

  function handleMoveToTrackDetail() {
    navigate(`/track-post/${trackInfo.trackId}`);
  }

  return (
    <Container onMouseEnter={hoverTrack} onMouseLeave={unhoverTrack} isHovered={isHovered}>
      <ThumnailWrapper>
        <Thumbnail src={trackInfo.trackImageFile} alt="profile-image" />
      </ThumnailWrapper>
      <TrackTitle isHovered={isHovered} onClick={handleMoveToTrackDetail}>
        {trackInfo.trackTitle}
      </TrackTitle>
      <Producer isHovered={isHovered}>{trackInfo.trackUserName}</Producer>
      <Category isHovered={isHovered}>{trackInfo.trackCategory}</Category>
      {trackInfo.trackKeyword.map((tag) => {
        return <Tag>#{tag}</Tag>;
      })}
    </Container>
  );
}
