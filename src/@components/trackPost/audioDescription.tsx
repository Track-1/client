import { useParams } from "react-router-dom";
import styled from "styled-components";
import { DescriptionIc } from "../../assets";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function AudioDescription() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));

  return (
    <DescriptionBox>
      <DescriptionIcon />
      <Description>{trackDetail?.userIntroduction}</Description>
    </DescriptionBox>
  );
}

const DescriptionBox = styled.article`
  margin-top: 4.4rem;
`;

const DescriptionIcon = styled(DescriptionIc)`
  width: 14.6rem;
  height: 3.8rem;

  display: flex;
  align-items: center;
`;

const Description = styled.div`
  width: 51.5rem;
  ${({ theme }) => theme.fonts.description}
  font-family: "pretended";

  color: ${({ theme }) => theme.colors.gray2};
`;
