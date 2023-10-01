import { useState } from "react";
import styled, { css } from "styled-components";
import { PlayerPlayIc, PlayerStopIc } from "../../assets";
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

const ThumnailWrapper = styled.div<{ isHovered: boolean }>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.3rem;
  height: 8.3rem;

  margin-right: 2.8rem;
  margin-left: 2.4rem;

  border-radius: 6.55rem;
  overflow: hidden;

  ${({ isHovered }) =>
    isHovered &&
    css`
      ::before {
        position: absolute;
        top: 0;
        right: 0;

        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8); /* 원하는 색상과 투명도를 설정 */
      }
    `}
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const PlayButton = styled(PlayerPlayIc)`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 4rem;
  height: 4rem;

  transform: translate(-50%, -50%);
`;

const StopButton = styled(PlayerStopIc)`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 4rem;
  height: 4rem;

  transform: translate(-50%, -50%);
`;

const TrackText = styled.div<{ isHovered: boolean }>`
  ${({ theme }) => theme.fonts.body1};

  padding-right: 3rem;
  margin-left: 2.8rem;

  color: ${({ theme }) => theme.colors.white};
  :hover {
    color: ${({ isHovered, theme }) => isHovered && theme.colors.sub1};
    cursor: pointer;
  }
`;

const TrackTitle = styled(TrackText)`
  width: 26rem;
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

  function hoverTrack() {
    setIsHovered(true);
  }

  function unhoverTrack() {
    setIsHovered(false);
  }
  return (
    <Container onMouseEnter={hoverTrack} onMouseLeave={unhoverTrack} isHovered={isHovered}>
      <ThumnailWrapper isHovered={isHovered}>
        <Thumbnail src={trackInfo.trackImageFile} alt="profile-image" />
        {isHovered && <PlayButton />}
      </ThumnailWrapper>
      <TrackTitle isHovered={isHovered}>{trackInfo.trackTitle}</TrackTitle>
      <Producer isHovered={isHovered}>{trackInfo.trackUserName}</Producer>
      <Category isHovered={isHovered}>{trackInfo.trackCategory}</Category>
      {trackInfo.trackKeyword.map((tag) => {
        return <Tag>#{tag}</Tag>;
      })}
    </Container>
  );
}
