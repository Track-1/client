import styled from "styled-components";
import { CrossLogoIc, TrackSearchSlogunIc } from "../../assets";

const Container = styled.div`
  margin-left: 10rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 21rem;
  width: 143.4rem;
  align-items: center;
`;

const CrossLogoIcon = styled(CrossLogoIc)`
  width: 35rem;
  height: 16.6rem;
`;

const TrackSearchSlogunIcon = styled(TrackSearchSlogunIc)`
  width: 50rem;
  height: 10rem;
`;

const TitleWrapper = styled.div`
  display: flex;

  margin-bottom: 3.5rem;

  opacity: 0.3;
`;

const TitleText = styled.div`
  ${({ theme }) => theme.fonts.cations};

  color: ${({ theme }) => theme.colors.white};
`;

const TrackTitle = styled(TitleText)`
  width: 47.8rem;
`;

const Producer = styled(TitleText)`
  width: 21.3rem;
`;

const Category = styled(TitleText)`
  width: 21.3rem;
`;
const Hashtag = styled(TitleText)`
  width: 50rem;
`;

export default function ListTitle() {
  return (
    <Container>
      <LogoWrapper>
        <TrackSearchSlogunIcon />
        <CrossLogoIcon />
      </LogoWrapper>
      <TitleWrapper>
        <TrackTitle>Title</TrackTitle>
        <Producer>Producer</Producer>
        <Category>Category</Category>
        <Hashtag>Hashtag</Hashtag>
      </TitleWrapper>
    </Container>
  );
}
