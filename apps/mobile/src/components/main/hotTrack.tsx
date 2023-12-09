import styled from 'styled-components';
import { isProducer } from '../../utils/common/check';
import BannerPlaybar from './bannerPlaybar';

const NOT_LOGGED_IN = 'Listen to this\n Awesome music\n Before you Sign up';
const LOGGED_IN_PRODUCER = 'Discover your\n Limitless Inspiration\n with Vocals here';
const LOGGED_IN_VOCAL = 'Discover your\n Limitless Chance\n with Producers here';

export default function HotTrack() {
  const isLoggedIn = true;
  const userType = 'producer';
  const BANNER_TEXT = isLoggedIn ? (isProducer(userType) ? LOGGED_IN_PRODUCER : LOGGED_IN_VOCAL) : NOT_LOGGED_IN;

  return (
    <Container>
      <BannerText>{BANNER_TEXT}</BannerText>
      {!isLoggedIn && <div>Sign UP for Free</div>}
      <BannerPlaybar />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 39.1rem;

  margin-top: 1.4rem;
  background: linear-gradient(180deg, #0d0e11 0%, rgba(13, 14, 17, 0) 100%);

  /* background-image: ; */
`;

const BannerText = styled.h1`
  margin: 2.6rem 2.5rem 0;

  ${({ theme }) => theme.fonts.Alex_34_M};
  color: ${({ theme }) => theme.colors.white};
  line-height: 150%;
`;
