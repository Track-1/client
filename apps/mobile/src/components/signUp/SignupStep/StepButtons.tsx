import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIGNUP_STEP } from '../../../core/signUp/stepRenderer';
import { useJoin } from '../../../hooks/queries/user';
import { role } from '../../../recoil/common/role';
import { isNextStep } from '../../../recoil/signUp/isNextStep';
import { joinUserData } from '../../../recoil/signUp/joinUserData';
import { UserType } from '../../../type/common/userType';
import { JoinUserDataPropsType } from '../../../type/signUp/joinUserDataType';
import { StepMainProps } from '../../../type/signUp/stepProps';

interface ButtonProp {
  onClick: () => void;
}

export function Prev(prop: ButtonProp) {
  const { onClick } = prop;

  return (
    <Styled.PrevButton type="button" onClick={onClick}>
      Prev
    </Styled.PrevButton>
  );
}

export function Next(prop: ButtonProp) {
  const { onClick } = prop;
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);

  return (
    <Styled.NextButton type="button" disabled={!isSuccess} onClick={onClick}>
      Next
    </Styled.NextButton>
  );
}

export default function StepButtons(props: StepMainProps) {
  const { step, setStep } = props;
  const [roleType, setRoleType] = useRecoilState<string | UserType>(role);
  const [isSuccess, setIsSuccess] = useRecoilState<boolean>(isNextStep);
  const [userData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const { join } = useJoin();

  function checkFinalStep() {
    return step === SIGNUP_STEP.NICKNAME_CONVENTION;
  }

  function moveToNextStep() {
    if (checkFinalStep()) {
      join({ userType: roleType === 'producer' ? 'producer' : 'vocal', formData: userData });
    } else {
      setStep(step + 1);

      setIsSuccess(false);
    }
  }

  function moveToPrevStep() {
    if (step === SIGNUP_STEP.EMAIL_PASSWORD) {
      setRoleType(null);
    }
    setStep(step - 1);

    setIsSuccess(false);
  }

  return (
    <Styled.ButtonWrapper>
      {step !== 1 ? <Prev onClick={moveToPrevStep} /> : <p></p>}
      <Next onClick={moveToNextStep} />
    </Styled.ButtonWrapper>
  );
}

const Styled = {
  PrevButton: styled.button`
    color: ${({ theme }) => theme.colors.gray4};
    ${({ theme }) => theme.fonts.Alex_20_R}
  `,
  NextButton: styled.button<{ disabled: boolean }>`
    ${({ theme }) => theme.fonts.Alex_20_R}
    color: ${({ theme, disabled }) => (disabled ? theme.colors.gray4 : theme.colors.white)};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 8rem;
  `,
};
