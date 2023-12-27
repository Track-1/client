import styled from 'styled-components';
import WelcomeTitle from './WelcomeTitle';

const WELCOME_TITLE = {
  PRODUCER: 'DISCOVER YOUR LIMITLESS INSPIRATION',
  VOCAL: 'DISCOVER YOUR LIMITLESS CHANCE',
} satisfies Record<string, string>;

const WELCOME_SUB_TITLE = {
  PRODUCER: 'With these Awesome Vocals',
  VOCAL: 'With these Awesome Producers',
} satisfies Record<string, string>;

export default function SignupSuccess() {
  return (
    <>
      <Styled.Congratulations>Congratulations!</Styled.Congratulations>
      <WelcomeTitle title={WELCOME_TITLE.PRODUCER} />
      <Styled.SubTitle>{WELCOME_SUB_TITLE.PRODUCER}</Styled.SubTitle>
    </>
  );
}

const Styled = {
  Congratulations: styled.h1`
    color: ${({ theme }) => theme.colors.neon_purple};
    ${({ theme }) => theme.fonts.Alex_25_R}
  `,
  SubTitle: styled.p`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.Alex_20_R};
  `,
};
