import styled from 'styled-components';
// import BannerPlaybar from './bannerPlaybar';
import { useRecoilValue } from 'recoil';
// import { useMovePage } from '../../hooks/common/useMovePage';
import { checkIsLogin, checkIsProducer, useGetRecentTracks, useGetRecentVocals } from 'track-1-shared';
import BannerPlaybar from './bannerPlaybar';
import { loginUserData } from 'src/recoil/common/loginUserData';
import { PADDING_SIDE } from 'src/constant/style';

export default function MainBanner() {
  const { userId, userType } = useRecoilValue(loginUserData);
  const BANNER_TEXT =
    checkIsLogin() && userId > 0 ? (checkIsProducer(userType) ? LOGGED_IN_PRODUCER : LOGGED_IN_VOCAL) : NOT_LOGGED_IN;
  // const { handleMovePage } = useMovePage();

  const { recentTrackInfo } = useGetRecentTracks(4);
  const { recentVocalInfo } = useGetRecentVocals(4);

  const trackImage = recentTrackInfo && recentTrackInfo[0] ? recentTrackInfo[0].trackImageFile : '';
  const vocalImage = recentVocalInfo && recentVocalInfo[0] ? recentVocalInfo[0].userImageFile : '';

  return (
    <Container imageUrl={checkIsProducer(userType) ? vocalImage : trackImage}>
      <BannerText>{BANNER_TEXT}</BannerText>

      {!checkIsLogin() ||
        // (userId < 0 && <SignupButton onClick={() => handleMovePage('signup')}>Sign up for free</SignupButton>)}
        (userId < 0 && <SignupButton>Sign up for free</SignupButton>)}
      <BannerPlaybar />
    </Container>
  );
}

const Container = styled.section<{ imageUrl: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: calc(${`100% + ${PADDING_SIDE}*2`});
  height: 39.1rem;

  padding: ${`0 ${PADDING_SIDE}`};
  padding-top: 1.4rem;

  margin-left: ${`-${PADDING_SIDE}`};
  margin-bottom: 7rem;

  background: linear-gradient(180deg, #0d0e11 0%, rgba(13, 14, 17, 0) 100%), url(${({ imageUrl }) => imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
`;

const BannerText = styled.h1`
  margin-top: 2.6rem;

  ${({ theme }) => theme.fonts.Alex_34_R};
  color: ${({ theme }) => theme.colors.white};
  line-height: 150%;
`;

const SignupButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17.8rem;
  height: 4.5rem;

  ${({ theme }) => theme.fonts.Alex_16_R};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 3.5rem;
  background-color: ${({ theme }) => theme.colors.neon_purple};
`;

const NOT_LOGGED_IN = 'Listen to this\n Awesome music\n Before you Sign up';
const LOGGED_IN_PRODUCER = 'Discover your\nLimitless Inspiration\nwith Vocals here';
const LOGGED_IN_VOCAL = 'Discover your\nLimitless Chance\n with Producers here';
