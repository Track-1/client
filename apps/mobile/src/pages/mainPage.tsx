import Layout from '../components/Common/Layout';
// import Footer from '../components/Common/Layout/footer';
import Header from '../components/Common/Layout/header';
import MainPageContainer from '../components/Pages/main';

export default function MainPage() {
  return (
    <>
      <Header />
      <Layout>
        <MainPageContainer />
      </Layout>
      {/* <Footer /> */}
    </>
  );
}
