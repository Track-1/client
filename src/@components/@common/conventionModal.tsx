import React from 'react'
import styled from 'styled-components';
import { SignUpModalXIc } from '../../assets';
import { PersonalInformationProcessingPolicy } from '../../core/constants/convention';

export default function ConventionModal() {
  return (
    <ModalBackground>
        <Modal>
            <ModalHeader>
                <SignUpModalXIc/>
                <Title>
                    {PersonalInformationProcessingPolicy.CONTENTS}
                </Title>
            </ModalHeader>
        </Modal>
    </ModalBackground>
  )
}

const ModalBackground=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;

    width: 192rem;
    height: 108rem;

    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
`

const Modal=styled.div`
    width: 77.7rem;
    height: 88.8rem;

    padding: 6.2rem 5.8rem;

    backdrop-filter: blur(1rem);

    border: 0.3rem solid transparent;
    border-radius: 5rem;
    background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3E4045);

    background-origin: border-box;
    background-clip: content-box, border-box;
`

const ModalHeader=styled.header`
    display: flex;
`

const Title=styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 61.5rem;
    height: 2.2rem;

    ${({theme})=>theme.fonts.typography}
`