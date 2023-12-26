import Text from '../components/common/Text';
import Header from '../components/header';
import Layout from '../components/layout';
import ProducerProfileContainer from '../components/profile/producerProfileContainer';

export default function ProducerProfilePage() {
  return (
    <>
      <Header headerStyle="mid">
        <Text as="h2" font={'Pre_18_R'} color={'neon_green'}>
          profile
        </Text>
      </Header>
      <Layout>
        <ProducerProfileContainer />
      </Layout>
    </>
  );
}
