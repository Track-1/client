import styled from 'styled-components'
import { SignupNotSelectedProducerIc, SignupNotSelectedVocalIc, SignupSelectedProducerIc, SignupSelectedVocalIc, SignUpSelectRoleTitleIc } from '../../assets'
import { SetStepPropsType } from '../../type/signUpStepTypes';

export default function SignupRole(props:SetStepPropsType) {
    const {setStep}=props;

  return (
    <>
    <SignUpSelectRoleTitleIc/>
    <SignupNotSelectedProducerIc/>
    <SignupNotSelectedVocalIc/>
    <SignupSelectedProducerIc/>
    <SignupSelectedVocalIc/>
    </>
  )
}
