import styled from 'styled-components';
import Filter from '../@components/@common/filter';
import Header from '../@components/@common/layout/header';
import Player from '../@components/@common/player';
import TrackList from '../@components/trackSearch/trackList';
import TrackSearchHeader from '../@components/trackSearch/trackSearchHeader/trackSearchHeader';
import UploadButtonModal from '../@components/trackSearch/uploadButtonModal';
import useModal from '../hooks/common/useModal';
import React from 'react';
import HomeLogo from '../@components/@common/homeLogo';
import Layout from '../@components/@common/layout/layout';
import { useEffect } from 'react';
import { UploadButtonIc } from '../assets';
import { PlayerProvider } from '../context/playerContext';

export default function TrackSearchPage() {
  const { openModal, showModal, unShowModal } = useModal();

  function moveUploadPage() {
    openModal ? unShowModal() : showModal();
  }

  useEffect(() => {
    openModal && unShowModal();
  }, []);

  return (
    <Layout>
      <PlayerProvider>
        <Header headerStyle={headerStyle}>
          <HomeLogo />
          <TrackSearchHeader pageType="tracks" />
        </Header>
        <Wrapper>
          <Filter pageType="tracks" />
          <UploadButtonIcon onClick={moveUploadPage} />
          {openModal && <UploadButtonModal />}
          <TrackList />
        </Wrapper>
        <Player />
      </PlayerProvider>
    </Layout>
  );
}

const Wrapper = styled.section`
  display: flex;
  justify-content: space-around;
`;

const UploadButtonIcon = styled(UploadButtonIc)`
  position: fixed;
  top: 91.3rem;
  left: 7.5rem;
  width: 24.6rem;

  cursor: pointer;
`;

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '0',
};
