import styled, { CSSProperties } from "styled-components";
import Filter from "../@components/@common/filter";
import Player from "../@components/@common/player";
import VocalList from "../@components/vocalSearch/vocalList";
import { PlayerProvider } from "../context/playerContext";
import TrackSearchHeader from "../@components/trackSearch/trackSearchHeader/trackSearchHeader";

import Header from "../@components/@common/header";
import HomeLogo from "../@components/@common/homeLogo";
import { theme } from "../style/theme";

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <>
      <PlayerProvider>
        <Header headerStyle={headerStyle}>
          <HomeLogo />
          <TrackSearchHeader pageType="vocals" />
        </Header>
        <Wrapper>
          <Filter pageType="vocals" />
          <VocalList />
          <Player />
        </Wrapper>
      </PlayerProvider>
    </>
  );
}

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: "0",

  zIndex: 5,
};
