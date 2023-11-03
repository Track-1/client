import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function AudioTitle() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));

  return (
    <AudioTitleWrapper>
      <Title>{trackDetail?.trackTitle}</Title>
    </AudioTitleWrapper>
  );
}

const AudioTitleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 47rem;
`;

const Title = styled.h1`
  display: flex;
  flex-wrap: wrap;

  width: 47rem;
  word-break: keep-all;

  ${({ theme }) => theme.fonts.title};

  color: ${({ theme }) => theme.colors.white};

  word-break: break-all;

  cursor: pointer;
`;
