import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { MainTracksTextIc, MainVocalsTextIc, SloganIc } from '../../assets';
import hoverTracksBackground from '../../assets/image/hoverTracksImg.png';
import hoverVocalsBackground from '../../assets/image/hoverVocalsImg.png';
import originBackground from '../../assets/image/mainBackgroundImg.png';
import mainSloganImg from '../../assets/image/mainSloganImg.png';
import { openConventionModal } from '../../recoil/common/conventionModal';
import ConventionModal from '../@common/conventionModal';
import Footer from '../@common/footer';
import Header from '../@common/header';
import Ads from './ads';
import LoginButton from './loginButton';
import HomeLogo from '../@common/homeLogo';

export default function Main() {
  const showModal = useRecoilValue(openConventionModal);
  const navigate = useNavigate();
  const [isWhatHover, setIsWhatHover] = useState('');

  function handleMoveToVocals() {
    navigate('/vocal-search');
  }

  function handleMoveToTracks() {
    navigate('/track-search');
  }

  function handleResetHover() {
    setIsWhatHover('');
  }

  function handleVocalHover() {
    setIsWhatHover('vocals');
  }

  function handleTrackHover() {
    setIsWhatHover('tracks');
  }

  return (
    <>
      {showModal.isOpen && <ConventionModal />}
      <Header headerStyle={headerStyle}>
        <HomeLogo />
        <SloganIcon />
        <LoginButton />
      </Header>
      <MainPageWrapper>
        <Background
          originBackground={originBackground}
          hoverVocalsBackground={hoverVocalsBackground}
          hoverTracksBackground={hoverTracksBackground}
          isWhatHover={isWhatHover}
        />
        <VocalsTextIcon isVocalsHover={isWhatHover === 'vocals'} />
        <TracksTextIcon isTracksHover={isWhatHover === 'tracks'} />
        <VocalsArea onMouseEnter={handleVocalHover} onMouseLeave={handleResetHover} onClick={handleMoveToVocals} />
        <TracksArea onMouseEnter={handleTrackHover} onMouseLeave={handleResetHover} onClick={handleMoveToTracks} />
        <MainSlogan src={mainSloganImg} alt="슬로건" />
        <Ads />
        <Footer />
      </MainPageWrapper>
    </>
  );
}

const headerStyle: React.CSSProperties = {
  position: 'absolute',
};

const Background = styled.main<{
  originBackground: string;
  hoverVocalsBackground: string;
  hoverTracksBackground: string;
  isWhatHover: string;
}>`
  width: 192rem;
  content: url(${({ isWhatHover, originBackground, hoverTracksBackground, hoverVocalsBackground }) =>
    isWhatHover === '' ? originBackground : isWhatHover === 'vocals' ? hoverVocalsBackground : hoverTracksBackground});
`;

const MainPageWrapper = styled.div`
  background-color: black;
`;

const VocalsArea = styled.div`
  width: 48rem;
  height: 50rem;

  position: absolute;
  top: 41rem;
  left: 129rem;
  transform: rotate(40deg);
  cursor: pointer;
`;

const VocalsTextIcon = styled(MainVocalsTextIc)<{ isVocalsHover: boolean }>`
  position: absolute;
  top: 77rem;
  left: 151.7rem;

  width: 16rem;

  background-repeat: no-repeat;

  ${({ isVocalsHover }) =>
    isVocalsHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const TracksArea = styled.div`
  width: 50rem;
  height: 47rem;

  position: absolute;

  top: 8rem;
  left: 86.5rem;
  transform: rotate(-50deg);
  border-radius: 2.8rem 0 0;
  cursor: pointer;
`;

const TracksTextIcon = styled(MainTracksTextIc)<{ isTracksHover: boolean }>`
  position: absolute;

  top: 41rem;
  left: 110rem;

  width: 16rem;

  background-repeat: no-repeat;

  ${({ isTracksHover }) =>
    isTracksHover &&
    css`
      transition-duration: 0.2s;
      transform-origin: 0 100%;
      -webkit-transform: scale(1.2, 1.2);
      -moz-transform: scale(1.2, 1.2);
      -o-transform: scale(1.2, 1.2);
    `}
`;

const MainSlogan = styled.img`
  position: absolute;

  top: 50.6rem;
  left: 8.7rem;

  width: 35rem;
`;

const SloganIcon = styled(SloganIc)`
  cursor: pointer;

  width: 35rem;
`;
