import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MoveTouploadPortfolioButtonIc, MoveTouploadVocalSearchingButtonIc, SignUpGetStartedButtonIc, SignUpProducerButtonIc, SignUpProducerQIc, SignUpSuccessBackgroundIc, SignUpVocalButtonIc, SignUpVocalQIc } from '../../assets'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserType } from '../../recoil/main';
import { currentUser } from '../../core/constants/userType';
import { profileCategory } from '../../core/constants/pageCategory';
import { useState } from 'react';
import { isProducer, isVocal } from '../../utils/common/userType';
import useModal from '../../utils/hooks/useModal';

export default function SignupSuccess() {
    const userType=useRecoilValue<string>(UserType)
    const [visible, setVisible]=useState<boolean>(false)
    const navigate=useNavigate()
    // const { modalRef } = useModal();
    const modalRef = useRef<HTMLUListElement>(null);
    const [editModalToggle, setEditModalToggle]=useState<boolean>(false)

    function moveToHome(){
        navigate('/')
    }

    function moveToVocalUpload(){
        navigate(`/upload/${currentUser.VOCAL}`)
    }

    function openProducerUploadModal(){
        setVisible(true)
    }

    function moveToProducerUpload(page:string){
        navigate(page)
    }

    function isClickedOutside(e: MouseEvent) {
        return editModalToggle && !modalRef.current?.contains(e.target as Node);
      }
    
      function closeModal(e: MouseEvent) {
        if (isClickedOutside(e)) {
          setEditModalToggle(false);
        }
      }
    
      useEffect(() => {
        document.addEventListener("mousedown", closeModal);
        return () => {
          document.removeEventListener("mousedown", closeModal);
        };
      }, [editModalToggle]);

    // const modalCloseHandler = (e:any) => {
    //     if(visible && modalRef.current && !modalRef.current.contains(e.target)) setVisible(false);
    //   };
      
    //   useEffect(() => {
    //     window.addEventListener('click', modalCloseHandler);
    //     return () => {
    //       window.removeEventListener('click', modalCloseHandler);
    //     };
    //   });

  return (
    <SuccessPageContainer>
        <SignUpSuccessBackgroundIcon/>

    <SuccessPageWrapper>
    <SignUpGetStartedButtonIcon onClick={moveToHome}/>

        {isVocal(userType)&&(
            <UploadButtonWrapper>
                <SignUpVocalQIcon/>
                <UploadButton>
                    <SignUpVocalButtonIcon onClick={moveToVocalUpload}/>
                </UploadButton>
            </UploadButtonWrapper>
        )}
        {isProducer(userType)&&(
            <UploadButtonWrapper>
                <SignUpProducerQIcon/>
                <UploadButton>
                    <SignUpProducerButtonIcon onClick={openProducerUploadModal}/>
                </UploadButton>
            </UploadButtonWrapper>
        )}
        {editModalToggle&&(
        <ModalWrapper ref={modalRef}>
            <MoveTouploadVocalSearchingButtonIcon onClick={()=>moveToProducerUpload(`/upload/${profileCategory.VOCAL_SEARCHING}`)}/>
            <MoveTouploadPortfolioButtonIcon onClick={()=>moveToProducerUpload(`/upload/${profileCategory.PORTFOLIO}`)}/>
        </ModalWrapper>
        )}

    </SuccessPageWrapper>
    </SuccessPageContainer>
  )
}

const SuccessPageWrapper=styled.div`
    position: absolute;

    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
`

const SignUpGetStartedButtonIcon=styled(SignUpGetStartedButtonIc)`
    width: 55.5rem;
    margin-top: 46.7rem;

    cursor: pointer;
`

const UploadButtonWrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-top: 9.7rem;
`

const UploadButton=styled.div`
    margin-top: 1rem;
    cursor: pointer;
`

const ModalWrapper=styled.section`
    display: flex;
    flex-direction: column;

    margin: 2.5rem 0 0 13.6rem;

    cursor: pointer;
`

const SignUpSuccessBackgroundIcon=styled(SignUpSuccessBackgroundIc)`
    width: 192rem;
    height: 108rem;
`

const SuccessPageContainer=styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const SignUpVocalQIcon=styled(SignUpVocalQIc)`
    width: 51.5rem;
`

const SignUpProducerQIcon=styled(SignUpProducerQIc)`
     width: 50.6rem;
`

const SignUpVocalButtonIcon=styled(SignUpVocalButtonIc)`
    width: 55.5rem;
`

const SignUpProducerButtonIcon=styled(SignUpProducerButtonIc)`
    width: 55.5rem;
`

const MoveTouploadVocalSearchingButtonIcon=styled(MoveTouploadVocalSearchingButtonIc)`
    width: 28.4rem;
    height: 10.6rem;
`

const MoveTouploadPortfolioButtonIcon=styled(MoveTouploadPortfolioButtonIc)`
    width: 28.4rem;
    height: 8.4rem;
`