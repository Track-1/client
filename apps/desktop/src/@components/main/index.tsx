import styled from 'styled-components';
import RecentInfoSection from './recentInfoSection';
import RecentTrackList from './recentTrackList';
import RecentVocalList from './recentVocalList';
import MainBanner from './mainBanner';
import EventSection from './eventSection';
import { PlayerContext, PlayerProvider } from '../../context/playerContext';
import Player from '../@common/player';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../@common/footer';
import MainHeader from './mainHeader';
import { PopupModal } from '../@common/Modal';
import { getCookie } from '../../utils/common/cookie';

export default function MainPageContainer() {
  const { quitAudioForMovePage } = useContext(PlayerContext);
  const navigate = useNavigate();

  function handleMoveVocalSearch() {
    quitAudioForMovePage();
    navigate('/vocal-search');
  }

  function handleMoveTrackSearch() {
    quitAudioForMovePage();
    navigate('/track-search');
  }


  return (
    <PlayerProvider>
      {/*!getCookie('popup') &&<PopupModal />*/}
      {/* HEADER */}
      <MainHeader />
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

const Styled = {
  DivisionLine: styled.hr`
    width: 100%;

    margin: 15rem 0;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray4};
  `,
};
