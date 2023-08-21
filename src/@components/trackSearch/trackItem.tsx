import { useState } from "react";
import styled from "styled-components";

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

export default function TrackItem() {
  const [isHovered, setIsHovered] = useState(false);

  function hoverTrack() {
    setIsHovered(true);
  }

  function unhoverTrack() {
    setIsHovered(false);
  }
  return (
    <Container onMouseEnter={hoverTrack} onMouseLeave={unhoverTrack} isHovered={isHovered}>
      <ThumnailWrapper>
        <Thumbnail />
      </ThumnailWrapper>
      <TrackTitle isHovered={isHovered}>Favorate</TrackTitle>
      <Producer isHovered={isHovered}>Nct127</Producer>
      <Category isHovered={isHovered}>Hiphop</Category>
      <Tag>#avb</Tag>
    </Container>
  );
}
