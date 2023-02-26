import React, { useRef, useState } from 'react'
import { SignUpChangeImageIc, SignUpUploadImageIc } from '../../assets';
import { SetStepPropsType } from '../../type/signUpStepTypes';
import { UploadInfoDataType } from '../../type/uploadInfoDataType';
import { uploadImage } from '../../utils/uploadPage/uploadImage';
import styled from 'styled-components';

export default function SignupNicknameConvention(props:SetStepPropsType) {
    const {setStep}=props;
    const [imageSrc, setImageSrc] = useState<string>("");
    const [isHover, setIsHover]=useState<boolean>(false);

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

  return (
    <>
    <ImageContainer>
      <Label htmlFor='profile-img' onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
        {imageSrc&&isHover&&<SignUpChangeImageIcon/>}
        {imageSrc ? (
          <ImgWrapper>
              <Img src={imageSrc} alt="preview-img" />
          </ImgWrapper>
        ):(
          <SignUpUploadImageIcon/>
        )}
      </Label>
        <input type="file" id="profile-img" style={{ visibility: "hidden" }} onChange={(e) => {uploadImage(e)}} />
    </ImageContainer>
    
    </>
  );

}

const Label=styled.label`
  cursor: pointer;
`

const ImageContainer=styled.section`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
`

const ImgWrapper=styled.div`
  width: 21.7rem;
  height: 21.7rem;
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

  position: absolute;
  z-index: 2;
`

const SignUpUploadImageIcon=styled(SignUpUploadImageIc)`
  position: absolute;
`