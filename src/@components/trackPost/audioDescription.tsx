import styled from "styled-components";
import { DescriptionIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function AudioDescription() {
  const { userIntroduction } = useGetTrackInfo();

  return (
    <DescriptionBox>
      <DescriptionIcon />
      <Description>{userIntroduction}</Description>
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
