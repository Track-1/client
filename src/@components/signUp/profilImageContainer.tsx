import React from 'react'
import styled from 'styled-components'
import { SignUpChangeImageIc, SignUpUploadImageIc } from '../../assets'
import { UserType } from '../../recoil/main';
import { useRecoilValue } from 'recoil';

interface ImageContainerPropsType{
    imageSrc:string;
    isHover:boolean;
    checkImageHover: () => void;
    uploadImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfilImageContainer(props:ImageContainerPropsType) {
    const {imageSrc, isHover, checkImageHover, uploadImage}=props;
    const userType=useRecoilValue(UserType)

  return (
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
  )
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
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 21.7rem;
  height: 21.7rem;

  border-radius: 25rem;

  position: absolute;
  overflow: hidden;

`

const Img=styled.img`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(50, 50);
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: auto;
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