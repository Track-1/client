import styled from "styled-components";
import Filter from "../@components/@common/filter";
import TrackList from "../@components/trackSearch/trackList";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;
export default function TrackSearchPage() {
  return (
    <Wrapper>
      <Filter pageType="tracks" />
      <TrackList />
    </Wrapper>
  );
}
