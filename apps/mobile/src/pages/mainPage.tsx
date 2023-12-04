import Header from '../components/header';
import Layout from '../components/layout';
import MainContainer from '../components/main';

export default function MainPage() {
  return (
    <Layout layoutKey='header'>
      <MainContainer />
    </Layout>
  );
}
