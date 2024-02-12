import styled from 'styled-components';
import Filter from '../@components/@common/filter';
import VocalList from '../@components/vocalSearch/vocalList';
import TrackSearchHeader from '../@components/trackSearch/trackSearchHeader/trackSearchHeader';
import Header from '../@components/@common/header';
import HomeLogo from '../@components/@common/homeLogo';
import Layout from '../@components/@common/Layout';

const Wrapper = styled.section`
  display: flex;
`;
export default function VocalSearchPage() {
  return (
    <Layout>
      <Header headerStyle={headerStyle}>
        <HomeLogo />
        <TrackSearchHeader pageType="vocals" />
      </Header>
      <Wrapper>
        <Filter pageType="vocals" />
        <VocalList />
      </Wrapper>
    </Layout>
  );
}

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '0',

  zIndex: 5,
};
