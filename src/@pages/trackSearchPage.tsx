import styled from "styled-components";
import Filter from "../@components/@common/filter";
import Player from "../@components/@common/player";
import TrackList from "../@components/trackSearch/trackList";
import { PlayerProvider } from "../context/playerContext";

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;
export default function TrackSearchPage() {
  return (
    <Wrapper>
      <PlayerProvider>
        <Filter pageType="tracks" />
        <TrackList />
        <Player />
      </PlayerProvider>
    </Wrapper>
  );
}
