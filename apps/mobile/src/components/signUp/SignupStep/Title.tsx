import styled from 'styled-components';
import { SIGNUP_STEP } from '../../../core/signUp/stepRenderer';
import { StepProp } from '../../../type/signUp/stepProps';

export default function Title(props: StepProp) {
  const { step } = props;

  switch (step) {
    case SIGNUP_STEP.ROLE:
      return (
        <Styled.TitleFont>
          What do you mainly
          <br />
          want to do?
        </Styled.TitleFont>
      );
    case SIGNUP_STEP.EMAIL_PASSWORD:
      return (
        <Styled.TitleFont>
          Sign up with your <br />
          Email address
        </Styled.TitleFont>
      );
    case SIGNUP_STEP.NICKNAME_CONVENTION:
      return (
        <Styled.TitleFont>
          Complete your <br />
          Musician profile
        </Styled.TitleFont>
      );
    default:
      return <></>;
  }
}

const Styled = {
  TitleFont: styled.h1`
    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.Alex_25_R};
    white-space: pre-wrap;
    line-height: 150%;
    letter-spacing: -0.025rem;
  `,
};
