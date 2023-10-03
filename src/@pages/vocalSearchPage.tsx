import styled from "styled-components";
import Filter from "../@components/@common/filter";
import Player from "../@components/@common/player";
import VocalList from "../@components/vocalSearch/vocalList";
import { PlayerProvider } from "../context/playerContext";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";

import Header from "../@components/@common/header";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <>
      <Header homeLogo>
        <TrackSearchHeader />
      </Header>
      <Wrapper>
        <PlayerProvider>
          <Filter pageType="vocals" />
          <VocalList />
          <Player />
        </PlayerProvider>
      </Wrapper>
    </>
  );
}
