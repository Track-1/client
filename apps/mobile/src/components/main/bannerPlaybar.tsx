import styled from 'styled-components';
import TrackInfoForm from '../common/Form/trackInfoForm';
import { PlayIc } from '../../assets';

export default function BannerPlaybar() {
  const trackTitle = 'JETT (Deep House TRAP BEAT)';

  return (
    <Container>
      <TrackInfoForm topItem={'Rock'} topItemColor="neon_green" middleItem={trackTitle} />
      <PlayIc />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 2.2rem 2.5rem;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;
