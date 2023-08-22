import styled from "styled-components";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function AudioTitle() {
  const { title } = useGetTrackInfo();

  return (
    <AudioTitleWrapper>
      <Title>{title}</Title>
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

  margin-top: 25.1rem;

  cursor: pointer;
`;
