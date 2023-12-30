import Player from '../components/common/Player/player';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import VocalSearchContainer from '../components/vocalSearch';
import { PlayerProvider } from '../context/playerContext';

export default function VocalSearchPage() {
  return (
    <>
      <Header />
      <Layout>
        <VocalSearchContainer />
      </Layout>
      <Footer />
    </>
  );
}
