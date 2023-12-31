import Text from '../components/common/Text';
import EventDetailContainer from '../components/eventDetail';
import Footer from '../components/footer';
import Header from '../components/header';
import Layout from '../components/layout';

export default function EventDetailPage() {
  return (
    <>
      <Header headerStyle="mid">
        <Text as="h2" font={'Pre_18_M'} color={'white'}>
          Event for you
        </Text>
      </Header>
      <Layout>
        <EventDetailContainer />
      </Layout>
      <Footer />
    </>
  );
}
