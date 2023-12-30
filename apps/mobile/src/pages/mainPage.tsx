import Player from '../components/common/Player/player';
import Header from '../components/header';
import Layout from '../components/layout';
import MainContainer from '../components/main';
import { PlayerProvider } from '../context/playerContext';

export default function MainPage() {
  return (
    <>
      <Header />
      <Layout>
        <MainContainer />
      </Layout>
    </>
  );
}
