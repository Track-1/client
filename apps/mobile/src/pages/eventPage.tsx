import EventContainer from '../components/event';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';

export default function EventPage() {
  return (
    <>
      <Header />
      <Layout>
        <EventContainer />
      </Layout>
      <Footer/>
    </>
  );
}
