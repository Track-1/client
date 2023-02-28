import styled from 'styled-components';
import { LoginHereMessageIc, SignUpStep1Ic, SignUpStep2Ic, SignUpStep3Ic, SignUpStepBlanckIc } from '../../assets';
import { StepPropsType } from '../../type/signUpStepTypes'
import { checkStepType } from '../../utils/signUp/stepType';
import { useNavigate } from 'react-router-dom';
import { signUpHeader } from '../../core/signUp/signupStepType';


export default function SignupStepHeader(props:StepPropsType) {
    const {step}=props;
    const navigate=useNavigate()

    function moveLoginPage(){
        navigate('/log-in')
    }

    function isHeaderExist(){
        return checkStepType(step)!==signUpHeader.FOUR
    }

    function isStepOne(){
        return checkStepType(step)===signUpHeader.ONE
    }

    function isStepTwo(){
        return checkStepType(step)===signUpHeader.TWO
    }

    function isStepThree(){
        return checkStepType(step)===signUpHeader.THREE
    }

  return (
    <>
    {isHeaderExist()&&
    <StepHeaderWrapper>
        <StepsWrapper>
            {isStepOne()?<SignUpStep1Ic/>:<SignUpStepBlanckIc/>}
            {isStepTwo()?<SignUpStep2Ic/>:<SignUpStepBlanckIc/>}
            {isStepThree()?<SignUpStep3Ic/>:<SignUpStepBlanckIc/>}
        </StepsWrapper>
        <LoginHereMessageIcon onClick={moveLoginPage}/>
    </StepHeaderWrapper>
    }
    </>
  )
}

const LoginHereMessageIcon=styled(LoginHereMessageIc)`
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