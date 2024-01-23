import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isNextStep } from '../../../recoil/signUp/isNextStep';
import { StepButtonsProps, StepProp } from '../../../type/signUp/stepProps';

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
  const isSuccess = useRecoilValue<boolean>(isNextStep);

  return (
    <Styled.NextButton type="button" disabled={!isSuccess} onClick={onClick}>
      Next
    </Styled.NextButton>
  );
}

export default function StepButtons(props: StepButtonsProps) {
  const { step, moveToNextStep, moveToPrevStep } = props;

  return (
    <Styled.ButtonWrapper>
      {step !== 1 ? <Prev onClick={moveToPrevStep} /> : <p></p>}
      {step > 1 && <Next onClick={moveToNextStep} />}
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
    padding: 8rem 0;
  `,
};
