import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Filter from '../@components/@common/filter';
import Header from '../@components/@common/header';
import Player from '../@components/@common/player';
import TrackList from '../@components/trackSearch/trackList';
import TrackSearchHeader from '../@components/trackSearch/trackSearchHeader/trackSearchHeader';
import UploadButtonModal from '../@components/trackSearch/uploadButtonModal';
import { UploadButtonIc } from '../assets';
import { PlayerProvider } from '../context/playerContext';
import useModal from '../hooks/common/useModal';
import { blockAccess } from '../utils/common/privateRouter';
import React from 'react';
import HomeLogo from '../@components/@common/homeLogo';
import { loginUserData } from '../recoil/common/loginUserData';
import Layout from '../@components/@common/Layout';

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

export default function TrackSearchPage() {
  const { openModal, showModal, unShowModal } = useModal();
  const userType = useRecoilValue(loginUserData).userType;
  const navigate = useNavigate();
  const prevURL = useLocation().pathname;

  useEffect(() => {
    openModal && unShowModal();
  }, []);

  function moveUploadPage() {
    blockAccess()
      ? navigate('/login', {
          state: {
            prevURL: prevURL,
          },
        })
      : userType === 'producer'
      ? openModal
        ? unShowModal()
        : showModal()
      : alert('Please use this function after producer logging in.\n해당 기능은 프로듀서로 로그인 후 이용해주세요.');
  }

  return (
    <Layout>
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
    </Layout>
  );
}

const headerStyle: React.CSSProperties = {
  position: 'sticky',
  top: '0',
};
