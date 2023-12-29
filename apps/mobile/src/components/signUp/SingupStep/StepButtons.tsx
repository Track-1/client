import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { SIGNUP_STEP } from '../../../core/signUp/stepRenderer';
import { role } from '../../../recoil/common/role';
import { UserType } from '../../../type/common/userType';
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

  return (
    <Styled.NextButton type="button" disabled={true} onClick={onClick}>
      Next
    </Styled.NextButton>
  );
}

export default function StepButtons(props: StepMainProps) {
  const { step, setStep } = props;
  const [roleType, setRoleType] = useRecoilState<string | UserType>(role);

  function moveToNextStep() {
    setStep(step + 1);
  }

  function moveToPrevStep() {
    if (step === SIGNUP_STEP.EMAIL_PASSWORD) {
      setRoleType('');
    }
    setStep(step - 1);
  }

  return (
    <div>
      <Styled.ButtonWrapper>
        <Prev onClick={moveToPrevStep} />
        <Next onClick={moveToNextStep} />
      </Styled.ButtonWrapper>
    </div>
  );
}

const Styled = {
  PrevButton: styled.button`
    color: ${({ theme }) => theme.colors.gray4};
  `,
  NextButton: styled.button<{ disabled: boolean }>`
    color: ${({ theme, disabled }) => (disabled ? theme.colors.gray4 : theme.colors.white)};
  `,
  ButtonWrapper: styled.div`
    display: flex;
    justify-content: space-between;
  `,
};
