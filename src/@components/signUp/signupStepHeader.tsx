import styled from 'styled-components';
import { LoginHereMessageIc, SignUpStep1Ic, SignUpStep2Ic, SignUpStep3Ic, SignUpStepBlanckIc } from '../../assets';
import { OnlyStepPropsType } from '../../type/signUpStepTypes'
import { useNavigate } from 'react-router-dom';
import { isHeaderExist, isStepOne, isStepThree, isStepTwo } from '../../utils/signUp/checkSignUpStep';


export default function SignupStepHeader(props:OnlyStepPropsType) {
    const {step}=props;
    const navigate=useNavigate()

    function moveLoginPage(){
        navigate('/login')
    }

  return (
    <>
    {isHeaderExist({step})&&
    <StepHeaderWrapper>
        <StepsWrapper>
            {isStepOne({step})?<SignUpStep1Icon/>:<SignUpStepBlanckIcon/>}
            {isStepTwo({step})?<SignUpStep2Icon/>:<SignUpStepBlanckIcon/>}
            {isStepThree({step})?<SignUpStep3Icon/>:<SignUpStepBlanckIcon/>}
        </StepsWrapper>
        <LoginHereMessageIcon onClick={moveLoginPage}/>
    </StepHeaderWrapper>
    }
    </>
  )
}

const LoginHereMessageIcon=styled(LoginHereMessageIc)`
    width: 30.6rem;
    cursor: pointer;
`

const StepsWrapper=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 11.2rem;
    height: 2.4rem;
`

const StepHeaderWrapper=styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 56rem;
    height: 2.4rem;

    margin: 7rem 0 0 11rem;
`

const SignUpStepBlanckIcon=styled(SignUpStepBlanckIc)`
    width: 1.8rem;
    height: 1.8rem;
`

const SignUpStep1Icon=styled(SignUpStep1Ic)`
    width: 2.4rem;
    height: 2.4rem;
`

const SignUpStep2Icon=styled(SignUpStep1Ic)`
    width: 2.4rem;
    height: 2.4rem;
`

const SignUpStep3Icon=styled(SignUpStep1Ic)`
    width: 2.4rem;
    height: 2.4rem;
`