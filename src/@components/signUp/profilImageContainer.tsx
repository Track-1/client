import React from 'react'
import styled from 'styled-components'
import { SignUpChangeImageIc, SignUpChangeImgIc, SignUpUploadImageIc,SignUpVocalChangePhotoIc,SignupVocalProfileImgIc } from '../../assets'
import { UserType } from '../../recoil/main';
import { useRecoilValue } from 'recoil';
import { currentUser } from '../../core/constants/userType';
import { isVocal, isProducer } from '../../utils/common/userType';

interface ImageContainerPropsType{
    imageSrc:string;
    isHover:boolean;
    checkImageHover: () => void;
    uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function ProfilImageContainer(props:ImageContainerPropsType) {
    const {imageSrc, isHover, checkImageHover, uploadImage}=props;
    const userType=useRecoilValue(UserType)

    function showUploadImage(){
        switch(userType){
            case currentUser.PRODUCER:
                return <SignUpUploadImageIc/>
            case currentUser.VOCAL:
                return <SignupVocalProfileImgIc/>
        }
    }

    function checkImgHover(){
      return imageSrc&&isHover;
    }

  
    
  return (
    <ImageContainer isProducer={isProducer(userType)}>
    <Label htmlFor='profile-img' onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
      {imageSrc ? (
        <ImgWrapper isProducer={isProducer(userType)}>
            <Img src={imageSrc} alt="preview-img" isProducer={isProducer(userType)}/>
        </ImgWrapper>
      ):(
        <SignUpUploadImageWrapper>
            {showUploadImage()}
        </SignUpUploadImageWrapper>
      )}
      {checkImgHover()&&isProducer(userType)&&<SignUpChangeProducerImageIcon/>}
      {checkImgHover()&&isVocal(userType)&&(<SignUpChangeVocalImageIcon/>)} 
    </Label>
      <input type="file" id="profile-img" style={{ visibility: "hidden" }} onChange={(e) => {uploadImage(e)}} />
  </ImageContainer>
  )
}

const Label=styled.label`
  cursor: pointer;
`

const ImageContainer=styled.section<{isProducer:boolean}>`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: 21.7rem;
  height: 21.7rem;
`

const ImgWrapper=styled.div<{isProducer:boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width:${({isProducer})=>isProducer?21.7:16.4}rem;
  height: ${({isProducer})=>isProducer?21.7:16.4}rem;

  border-radius: ${({isProducer})=>isProducer?25:1.8}rem;

  position: absolute;
  overflow: hidden;

  transform: rotate(${({isProducer})=>!isProducer&&-45}deg);
  right: ${({isProducer})=>!isProducer&&30.16}rem;
  top:  ${({isProducer})=>!isProducer&&18.45}rem;
`

const Img=styled.img<{isProducer:boolean}>`
    width: ${({isProducer})=>isProducer?100:150}%;
    height: ${({isProducer})=>isProducer?100:135}%;

    position: absolute;
    transform: translate(50, 50);

    object-fit: cover;
    margin: auto;
    
    transform: rotate(${({isProducer})=>!isProducer&&45}deg);
`

const SignUpChangeProducerImageIcon=styled(SignUpChangeImageIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;
  
  backdrop-filter: blur(1.7rem);
`

const SignUpChangeVocalImageIcon=styled(SignUpChangeImgIc)`
  width: 16.5rem;
  height: 16.5rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 1.8rem;

  position: relative;
  
  backdrop-filter: blur(1.7rem);

  transform: rotate(45deg);
  position: absolute;
  right: 30.15rem;
  top: 18.45rem;
`

const SignUpUploadImageWrapper=styled.div`
  position: absolute;
`

