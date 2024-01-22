import { useState } from 'react';
import { SIGNUP_STEP } from '../../core/signUp/stepRenderer';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useJoin } from '../queries/user';
import { JoinUserDataPropsType } from '../../type/signUp/joinUserDataType';
import { joinUserData } from '../../recoil/signUp/joinUserData';
import { isNextStep } from '../../recoil/signUp/isNextStep';
import { role } from '../../recoil/common/role';
import { UserType } from '../../type/common/userType';
import { isProducer } from '../../utils/common/check';

export function useStep() {
  const [step, setStep] = useState(SIGNUP_STEP.ROLE);
  // const [step, setStep] = useState(3);

  const [roleType, setRoleType] = useRecoilState<UserType>(role);
  const setIsSuccess = useSetRecoilState<boolean>(isNextStep);
  const userData = useRecoilValue<JoinUserDataPropsType>(joinUserData);
  const { join } = useJoin();

  function checkFinalStep() {
    return step === SIGNUP_STEP.NICKNAME_CONVENTION;
  }

  function moveToNextStep() {
    if (checkFinalStep()) {
      join({ userType: isProducer(roleType) ? 'producer' : 'vocal', formData: userData });
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

  return { step, moveToNextStep, moveToPrevStep };
}
