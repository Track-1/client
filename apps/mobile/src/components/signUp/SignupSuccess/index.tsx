import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Button } from 'track-1-design-system';
import { ROLE } from '../../../core/common/roleType';
import { useGetRecentTracks } from '../../../hooks/queries/tracks';
import { useGetRecentVocals } from '../../../hooks/queries/vocals';
import { role } from '../../../recoil/common/role';
import { UserType } from '../../../type/common/userType';
import SlideCards from './SlideCards';
import WelcomeTitle from './WelcomeTitle';

const WELCOME_TITLE = {
  PRODUCER: 'DISCOVER\nYOUR\nLIMITLESS\nINSPIRATION',
  VOCAL: 'DISCOVER\nYOUR\nLIMITLESS\nCHANCE',
} satisfies Record<string, string>;

const WELCOME_SUB_TITLE = {
  PRODUCER: 'With these Awesome Vocals',
  VOCAL: 'With these Awesome Producers',
} satisfies Record<string, string>;

export default function SignupSuccess() {
  const { recentVocalInfo } = useGetRecentVocals(6);
  const { recentTrackInfo } = useGetRecentTracks(6);
  const roleType = useRecoilValue<string | UserType>(role);

  const recentVocalImages = recentVocalInfo?.map(({ userId, userImageFile }) => ({
    id: userId,
    imageFile: userImageFile,
  }));

  const recentTrackImages = recentTrackInfo?.map(({ trackId, trackImageFile }) => ({
    id: trackId,
    imageFile: trackImageFile,
  }));

  function checkIsRoleProducer() {
    return roleType === ROLE.PRODUCER;
  }

  return (
    <Styled.SuccessPageLayout>
      <Styled.Congratulations>Congratulations!</Styled.Congratulations>
      <WelcomeTitle title={checkIsRoleProducer() ? WELCOME_TITLE.PRODUCER : WELCOME_TITLE.VOCAL} />
      <SlideCards
        images={checkIsRoleProducer() ? recentVocalImages ?? [] : recentTrackImages ?? []}
        link={checkIsRoleProducer() ? `vocal-profile` : `track-post`}
      />
      <Styled.SubTitle>{checkIsRoleProducer() ? WELCOME_SUB_TITLE.PRODUCER : WELCOME_SUB_TITLE.VOCAL}</Styled.SubTitle>
      <Link to="/">
        <Button type="bottom" backgroundColor="purple" color="white" disabled={false}>
          Get Started
        </Button>
      </Link>
    </Styled.SuccessPageLayout>
  );
}

const Styled = {
  SuccessPageLayout: styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    height: 100vh;
    align-items: center;
    justify-content: center;
  `,
  Congratulations: styled.h1`
    color: ${({ theme }) => theme.colors.neon_purple};
    ${({ theme }) => theme.fonts.Alex_25_R}
  `,
  SubTitle: styled.p`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.Alex_20_R};
  `,
};
