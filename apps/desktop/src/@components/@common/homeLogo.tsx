import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { HeaderHomeLogoIc } from '../../assets';
import { PlayUseContext } from '../../context/playerContext';

export default function HomeLogo() {
  const navigate = useNavigate();
  const { quitAudioForMovePage } = PlayUseContext({});

  function handleMoveToHome() {
    quitAudioForMovePage();
    navigate('/');
  }

  return (
    <HeaderHomeLogoIconWrapper>
      <HeaderHomeLogoIcon onClick={handleMoveToHome} />
    </HeaderHomeLogoIconWrapper>
  );
}

const HeaderHomeLogoIconWrapper = styled.div`
  display: flex;
  align-items: center;

  width: 22.5rem;
  height: 100%;
`;

const HeaderHomeLogoIcon = styled(HeaderHomeLogoIc)`
  cursor: pointer;

  width: 22.5rem;
`;
