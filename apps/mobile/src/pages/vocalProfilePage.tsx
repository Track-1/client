import Text from '../components/common/Text';
import Header from '../components/header';
import Layout from '../components/layout';
import VocalProfileContainer from '../components/profile/vocalProfileContainer';

export default function VocalProfilePage() {
  return (
    <>
      <Header headerStyle="mid">
        <Text as="h2" font={'Pre_18_R'} color={'neon_pink'}>
          profile
        </Text>
      </Header>
      <Layout>
        <VocalProfileContainer />
      </Layout>
    </>
  );
}
