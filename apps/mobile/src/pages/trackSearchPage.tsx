import TrackFilterModal from '../components/common/Modal/Filter';
import Player from '../components/common/Player/player';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import TrackSearchContainer from '../components/trackSearch';
import { PlayerProvider } from '../context/playerContext';

export default function TrackSearchPage() {
  return (
    <>
      <Header />
      <Layout>
        <TrackSearchContainer />
      </Layout>
      <Footer />
    </>
  );
}
