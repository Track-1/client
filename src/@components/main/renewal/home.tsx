import styled, { CSSProperties } from "styled-components";
import Header from "../../@common/header";
import { theme } from "../../../style/theme";
import MainNav from "./mainNav";
import { MainLogoWhiteIc } from "../../../assets";
import LoginBtn from "./loginBtn";
import RecentInfoSection from "./recentInfoSection";
import RecentTrackList from "./recentTrackList";
import RecentVocalList from "./recentVocalList";
import MainBanner from "./mainBanner";
import EventSection from "./eventSection";
import { PlayerContext, PlayerProvider } from "../../../context/playerContext";
import Player from "../../@common/player";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../@common/footer";

export default function Home() {
  const { quitAudioForMovePage } = useContext(PlayerContext);
  const navigate = useNavigate();

  function handleMoveHome() {
    quitAudioForMovePage();
    navigate("/");
  }

  function handleMoveVocalSearch() {
    quitAudioForMovePage();
    navigate("/vocal-search");
  }

  function handleMoveTrackSearch() {
    quitAudioForMovePage();
    navigate("/track-search");
  }

  return (
    <PlayerProvider>
      {/* HEADER */}
      <Header headerStyle={headerStyle}>
        <Styled.HeaderWrapper>
          <Styled.MainLogoWhiteIcon onClick={handleMoveHome} />
          <MainNav handleMoveVocalSearch={handleMoveVocalSearch} handleMoveTrackSearch={handleMoveTrackSearch} />
        </Styled.HeaderWrapper>
        <LoginBtn />
      </Header>
      {/* MainBanner */}
      <MainBanner />
      {/* Recnet Vocal-Searhcing List*/}
      <RecentInfoSection headingText={`New Tracks\nfor vocal`} handleMoveToMore={handleMoveTrackSearch}>
        <RecentTrackList />
      </RecentInfoSection>
      <Styled.DivisionLine />
      {/* Recnet Vocal List*/}
      <RecentInfoSection headingText={`New Vocals\nfor producer`} handleMoveToMore={handleMoveVocalSearch}>
        <RecentVocalList />
      </RecentInfoSection>
      <Styled.DivisionLine />
      {/* Event Section */}
      <EventSection />
      <Footer />
      <Player />
    </PlayerProvider>
  );
}

const headerStyle: CSSProperties = {
  position: "fixed",
  zIndex: "5",
  background: `${theme.colors.black}`,
};

const Styled = {
  HeaderWrapper: styled.div`
    display: flex;
  `,
  MainLogoWhiteIcon: styled(MainLogoWhiteIc)`
    width: 18.3rem;

    cursor: pointer;
  `,

  DivisionLine: styled.hr`
    width: 100%;

    margin: 15rem 0;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray4};
  `,
};
