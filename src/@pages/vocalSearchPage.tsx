import styled from "styled-components";
import Filter from "../@components/@common/filter";
import Player from "../@components/@common/player";
import VocalList from "../@components/vocalSearch/vocalList";
import { PlayerProvider } from "../context/playerContext";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <Wrapper>
      <PlayerProvider>
        <Filter pageType="vocals" />
        <VocalList />
        <Player />
      </PlayerProvider>
    </Wrapper>
  );
}
