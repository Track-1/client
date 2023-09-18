import styled from "styled-components";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function AudioJacketImage() {
  const { trackImageFile } = useGetTrackInfo();

  return (
    <PlayImageWrapper>
      {/* <PlayImageWrapper className={!isCommentOpen && play ? "playAnimation" : "pauseAnimation"}> */}
      <PlayerImage src={trackImageFile} alt="재생 이미지" />
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

  position: absolute;
`;

const PlayerImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  position: absolute;
`;
