import styled from 'styled-components';
import Filter from '../@components/@common/filter';
import VocalList from '../@components/vocalSearch/vocalList';
import TrackSearchHeader from '../@components/trackSearch/trackSearchHeader/trackSearchHeader';
import Header from '../@components/@common/layout/header';
import HomeLogo from '../@components/@common/homeLogo';
import Layout from '../@components/@common/layout/layout';
import Player from '../@components/@common/player';
import { PlayerProvider } from '../context/playerContext';

export default function VocalSearchPage() {
  return (
    <Layout>
      <PlayerProvider>
        <Header headerStyle={headerStyle}>
          <HomeLogo />
          <TrackSearchHeader pageType="vocals" />
        </Header>
        <Wrapper>
          <Filter pageType="vocals" />
          <VocalList />
        </Wrapper>
        <Player />
      </PlayerProvider>
    </Layout>
  );
}

const Wrapper = styled.section`
  display: flex;
`;

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '0',

  zIndex: 5,
};
