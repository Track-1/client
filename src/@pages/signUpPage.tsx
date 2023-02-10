import styled from 'styled-components';
import BackButton from '../@components/@common/backButton';
import { SignBackgroundIc } from '../assets';
import Footer from '../@components/@common/footer';

export default function signUpPage() {
    function endSignUp(){
        if (window.confirm('회원가입을 종료하겠습니까?'))
        {
            // clicked Yes
        }
    }

  return (
    <>
        <BackButtonWrapper onClick={endSignUp}>
            <BackButton/>
        </BackButtonWrapper>
        <SignBackgroundIcon/>
        <Footer/>
    </>
  )
}

const BackButtonWrapper=styled.div`
    margin: 5.9rem 0 0 7.9rem;
`

const SignBackgroundIcon=styled(SignBackgroundIc)`
    margin-top: 26.6rem;
`