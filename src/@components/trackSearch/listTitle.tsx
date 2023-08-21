import styled from "styled-components";
import { CrossLogoIc, SloganIc } from "../../assets";

const Container = styled.div`
  margin-left: 10rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CrossLogoIcon = styled(CrossLogoIc)`
  width: 35rem;
  height: 16.6rem;
`;

const SloganIcon = styled(SloganIc)`
  width: 50rem;
  height: 10rem;

  margin-left: 6.6rem;
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
        <SloganIcon />
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
