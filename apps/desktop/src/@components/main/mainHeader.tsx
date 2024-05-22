import styled, { CSSProperties } from 'styled-components';
import Header from '../@common/layout/header';
import LoginBtn from './loginBtn';
import MainNav from './mainNav';
import { MainLogoWhiteIc } from '../../assets';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../style/theme';
import { PlayUseContext } from '../../context/playerContext';

export default function MainHeader() {
  const { quitAudioForMovePage } = PlayUseContext({});
  const navigate = useNavigate();

  function handleMoveHome() {
    quitAudioForMovePage();
    navigate('/');
  }

  function handleMoveVocalSearch() {
    quitAudioForMovePage();
    navigate('/vocal-search');
  }

  function handleMoveTrackSearch() {
    quitAudioForMovePage();
    navigate('/track-search');
  }

  return (
    <Header headerStyle={headerStyle}>
      <Styled.HeaderWrapper>
        <Styled.MainLogoWhiteIcon onClick={handleMoveHome} />
        <MainNav handleMoveVocalSearch={handleMoveVocalSearch} handleMoveTrackSearch={handleMoveTrackSearch} />
      </Styled.HeaderWrapper>
      <LoginBtn />
    </Header>
  );
}

const headerStyle: CSSProperties = {
  position: 'sticky',
  zIndex: '5',
  background: `${theme.colors.black}`,
};

const Styled = {
  HeaderWrapper: styled.div`
    display: flex;
  `,
  MainLogoWhiteIcon: styled(MainLogoWhiteIc)`
    width: 18.3rem;

    cursor: pointer;
  `,

  DivisionLine: styled.hr`
    width: 100%;

    margin: 15rem 0;
    border: 0.1rem solid ${({ theme }) => theme.colors.gray4};
  `,
};
