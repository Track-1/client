import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function AudioJacketImage() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));

  return (
    <PlayImageWrapper>
      {/* <PlayImageWrapper className={!isCommentOpen && play ? "playAnimation" : "pauseAnimation"}> */}
      <PlayerImage src={trackDetail?.trackImageFile} alt="재생 이미지" />
    </PlayImageWrapper>
  );
}

const PlayImageWrapper = styled.div`
  height: 60.4rem;
  width: 60.4rem;

  border-radius: 50%;

  margin-left: 3.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;
