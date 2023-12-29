import { useState } from 'react';
import StepButtons from '../components/signUp/SingupStep/StepButtons';
import { SIGNUP_STEP } from '../core/signUp/stepRenderer';

export default function SignupStepPage() {
  const [step, setStep] = useState<number>(SIGNUP_STEP.ROLE);

  return (
    <>
      <StepButtons step={step} setStep={setStep} />
    </>
  );
}
