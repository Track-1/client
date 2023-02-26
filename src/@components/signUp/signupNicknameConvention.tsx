import React, { useState } from 'react'
import { SignUpBackArrowIc, SignUpChangeImageIc, SignUpErrorIc, SignUpUploadImageIc, SignUpVerifyIc, WhatsYourNameTextIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import styled from 'styled-components';
import { setInputUnderline, setMessageColor } from '../../utils/errorMessage/setInputStyle';
import { signUpStep } from '../../core/signUp/signupStepType';
import ContinueButton from './continueButton';
import { nicknameValidMessage } from '../../core/userInfoErrorMessage/nicknameMessage';
import { checkNicknameForm } from '../../utils/errorMessage/checkNicknameForm';
import ConventionCheckBox from './conventionCheckBox';
import { continueType } from '../../core/signUp/continueType';

export default function SignupNicknameConvention(props:SetStepPropsType) {
    const {setStep}=props;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isHover, setIsHover]=useState<boolean>(false);
    const [nickname, setNickname]=useState<string>("")
    const [nicknameMessage, setNicknameMessage]=useState<string>("")
    const [completeCheck, setCompleteCheck]=useState<boolean>(false)

    const uploadImage = (e: React.ChangeEvent) => {
      const targetFiles = (e.target as HTMLInputElement).files as FileList;
      const targetFilesArray = Array.from(targetFiles);
      const selectedFiles: string[] = targetFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      setImageSrc(selectedFiles[0]);
    }

    function checkImageHover(){
      setIsHover(prev=>!prev)
    }

  function setErrorIcon(message:string){ 
    switch (message) {
        case nicknameValidMessage.ERROR:
            return <SignUpErrorIc/>;
        case nicknameValidMessage.SUCCESS:
            return <SignUpVerifyIc/>; 
        default:
            return ;
      }
  }

  function moveBackToEmailPassword(){
    setStep(signUpStep.SIGNUP_EMAIL_PASSWORD)
  }

  function successNextStep(){
    return (
      nicknameMessage===nicknameValidMessage.SUCCESS&&completeCheck?continueType.SUCCESS:continueType.FAIL
    )
  }

  function writeNickname(e: React.ChangeEvent<HTMLInputElement>){
    if(!e.target.value){
        setNicknameMessage(nicknameValidMessage.NULL)
    }

    else if(!checkNicknameForm(e.target.value)){
      setNicknameMessage(nicknameValidMessage.ERROR)
    }

    //임시
    else if(checkNicknameForm(e.target.value)){
      setNicknameMessage(nicknameValidMessage.SUCCESS)
    }

    setNickname(e.target.value)
  }
console.log(successNextStep())
  return (
    <>
    <ImageContainer>
      <Label htmlFor='profile-img' onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
        {imageSrc ? (
          <ImgWrapper>
              <Img src={imageSrc} alt="preview-img" />
          </ImgWrapper>
        ):(
          <SignUpUploadImageIcon/>
        )}
        {imageSrc&&isHover&&<SignUpChangeImageIcon/>}
      </Label>
        <input type="file" id="profile-img" style={{ visibility: "hidden" }} onChange={(e) => {uploadImage(e)}} />
    </ImageContainer>
    
    <NicknameWrapper>
      <WhatsYourNameTextIc/>
      <InputWrapper>
          <Input type="text" placeholder="Enter your user name" width={56} underline={setInputUnderline(nicknameMessage)} onChange={writeNickname}/>
          {setErrorIcon(nicknameMessage)&&(
              <IconWrapper marginLeft={-3.9}>
                  {setErrorIcon(nicknameMessage)}
              </IconWrapper>
          )}
      </InputWrapper>
      <MessageWrapper textColor={setMessageColor(nicknameMessage)}>
          {nicknameMessage}
      </MessageWrapper>
    </NicknameWrapper>
    <ConventionCheckBox setCompleteCheck={setCompleteCheck}/>
    <ArrowButtonWrapper>
      <SignUpBackArrowIcon onClick={moveBackToEmailPassword}/>
      <ContinueButton successNextStep={successNextStep()} step={signUpStep.SIGNUP_PROFILE} setStep={setStep}/>
    </ArrowButtonWrapper>
    
    </>
  );

}

const Label=styled.label`
  cursor: pointer;
`

const ImageContainer=styled.section`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: 21.7rem;
  height: 21.7rem;
`

const ImgWrapper=styled.div`
  width: 100%;

  border-radius: 25rem;

  position: absolute;

  overflow: hidden;
`

const Img=styled.img`
  width: 100%;
  
`

const SignUpChangeImageIcon=styled(SignUpChangeImageIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;
  
  backdrop-filter: blur(1.7rem);
`

const SignUpUploadImageIcon=styled(SignUpUploadImageIc)`
  position: absolute;
`

const Input=styled.input<{width:number, underline:string}>`
    display: flex;
    align-items: center;

    padding: 3rem 0 0.5rem 0;

    width: ${({width})=>width}rem;
    
    border-bottom: 0.1rem solid ${({underline})=>underline};

    color: ${({ theme }) => theme.colors.white};

    ${({ theme }) => theme.fonts.input};

    &::placeholder{
        color: ${({ theme }) => theme.colors.gray4};
    }
`

const InputWrapper=styled.div`
    display: flex;
    align-items: center;
`

const MessageWrapper=styled.p<{textColor:string}>`
    margin-top: 1.1rem;

    color: ${({textColor})=>textColor};

    ${({ theme }) => theme.fonts.error_message};
`

const IconWrapper=styled.div<{marginLeft:number}>`
    margin: 2rem 0 0 ${({marginLeft})=>marginLeft}rem;
`

const SignUpBackArrowIcon=styled(SignUpBackArrowIc)`
    position: absolute;
    margin-left:11rem;

    cursor: pointer;
`

const ArrowButtonWrapper=styled.div`
    margin-top:2.8rem;
`

const NicknameWrapper=styled.section`
    margin: 0rem 11rem;
`