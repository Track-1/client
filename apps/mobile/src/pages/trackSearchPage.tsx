import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';
import TrackSearchContainer from '../components/trackSearch';

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
