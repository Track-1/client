import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import ConventionModal from '../@components/@common/conventionModal'
import { openConventionModal } from '../recoil/conventionModal'
import SignBackground from "../assets/icon/signUpBackgroundIc.svg";
import Footer from '../@components/@common/footer'
import { ErrorPageIc } from '../assets'

export default function ErrorPage() {
    const showModal=useRecoilValue(openConventionModal);
    const background=SignBackground;

  return (
    <>
    <SignUpPageWrapper>
        <SignUpContainer>
            <Img src={background} alt="배경"/>
            <IconWrapper>
                <ErrorPageIcon/>
                <ErrorMessage>Please contact us <ins>track-1@track-1.link</ins></ErrorMessage>
            </IconWrapper>
        </SignUpContainer>
        <Footer/>
    </SignUpPageWrapper>
    {showModal&&(<ConventionModal/>)}
    </>
  )
}


const SignUpPageWrapper=styled.div`
    position: absolute;
`

const SignUpContainer=styled.div`
    width: 192rem;
    height: 90rem;
`

const Img=styled.img`
    position: absolute;
    width: 192rem;
    height: 90rem;

`

const ErrorPageIcon=styled(ErrorPageIc)`
    width: 65rem;
`

const IconWrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    margin-top: -12rem;
    position: absolute;
`

const ErrorMessage=styled.p`
    color: ${({theme})=>theme.colors.gray2};
    ${({theme})=>theme.fonts.player_title};
`