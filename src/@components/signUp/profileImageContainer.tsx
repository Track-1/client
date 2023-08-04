import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { SignUpChangeImageIc, SignUpChangeImgIc, SignUpUploadImageIc, SignupVocalProfileImgIc } from "../../assets";

import { ROLE } from "../../core/common/roleType";
import useUploadImageFile from "../../hooks/common/useUploadImageFile";
import { signupRole } from "../../recoil/common/role";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { isProducer, isVocal } from "../../utils/common/checkUserType";

export default function ProfilImageContainer() {
  const userType = useRecoilValue(signupRole);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const { checkImageSize, checkImageType, getFileSize, getFileURL } = useUploadImageFile();
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isHover, setIsHover] = useState(false);

  function checkImageHover() {
    setIsHover(!isHover);
  }

  function showUploadImage() {
    switch (userType) {
      case ROLE.PRODUCER:
        return <SignUpUploadImageIcon />;
      case ROLE.VOCAL:
        return <SignupVocalProfileImgIcon />;
    }
  }
  function uploadImage(e: React.ChangeEvent<HTMLInputElement>): void {
    const uploadName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
    if (e.target.files?.length === 0) {
      //alert("사진삽입이 취소되었습니다.")
    } else {
      if (checkImageType(uploadName) && e.target.files) {
        const file = e.target.files[0];
        const fileUrl: string = getFileURL(file);
        const imageSize: number = getFileSize(file);
        if (e.target.files[0] && checkImageSize(imageSize)) {
          setImageSrc(fileUrl);
          setUserData((prevState) => {
            return { ...prevState, imageFile: file };
          });
        }
      }
    }
  }

  function checkImgHover() {
    return imageSrc && isHover;
  }

  return (
    <ImageContainer isProducer={isProducer(userType)}>
      <Label htmlFor="profile-img" onMouseEnter={checkImageHover} onMouseLeave={checkImageHover}>
        {imageSrc ? (
          <ImgWrapper isProducer={isProducer(userType)}>
            <Img src={imageSrc} alt="preview-img" isProducer={isProducer(userType)} />
          </ImgWrapper>
        ) : (
          <SignUpUploadImageWrapper>{showUploadImage()}</SignUpUploadImageWrapper>
        )}
        {checkImgHover() && isProducer(userType) && <SignUpChangeProducerImageIcon />}
        {checkImgHover() && isVocal(userType) && <SignUpChangeVocalImageIcon />}
      </Label>
      <input
        type="file"
        id="profile-img"
        style={{ visibility: "hidden" }}
        accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
    </ImageContainer>
  );
}

const Label = styled.label`
  cursor: pointer;
`;

const ImageContainer = styled.section<{ isProducer: boolean }>`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: 21.7rem;
  height: 21.7rem;
`;

const ImgWrapper = styled.div<{ isProducer: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ isProducer }) => (isProducer ? 21.7 : 16.4)}rem;
  height: ${({ isProducer }) => (isProducer ? 21.7 : 16.4)}rem;

  border-radius: ${({ isProducer }) => (isProducer ? 25 : 1.8)}rem;

  position: absolute;
  overflow: hidden;

  transform: rotate(${({ isProducer }) => !isProducer && -45}deg);
  right: ${({ isProducer }) => !isProducer && 30.16}rem;
  top: ${({ isProducer }) => !isProducer && 18.45}rem;
`;

const Img = styled.img<{ isProducer: boolean }>`
  width: ${({ isProducer }) => (isProducer ? 100 : 150)}%;
  height: ${({ isProducer }) => (isProducer ? 100 : 135)}%;

  position: absolute;
  transform: translate(50, 50);

  object-fit: cover;
  margin: auto;

  transform: rotate(${({ isProducer }) => !isProducer && 45}deg);
`;

const SignUpChangeProducerImageIcon = styled(SignUpChangeImageIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;

  backdrop-filter: blur(1.7rem);
`;

const SignUpChangeVocalImageIcon = styled(SignUpChangeImgIc)`
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
`;

const SignUpUploadImageWrapper = styled.div`
  position: absolute;
`;

const SignUpUploadImageIcon = styled(SignUpUploadImageIc)`
  width: 21.7rem;
  height: 21.7rem;
`;

const SignupVocalProfileImgIcon = styled(SignupVocalProfileImgIc)`
  width: 21.7rem;
  height: 21.7rem;
`;
