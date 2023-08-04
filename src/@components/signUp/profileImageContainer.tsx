import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  SignUpChangeImageProducerIc,
  SignUpChangeImageVocalIc,
  SignUpUploadImageProducerIc,
  SignUpUploadImageVocalIc,
} from "../../assets";

import useUploadImageFile from "../../hooks/common/useUploadImageFile";
import { signupRole } from "../../recoil/common/role";
import { joinUserData } from "../../recoil/signUp/joinUserData";
import { JoinUserDataPropsType } from "../../type/signUp/joinUserDataType";
import { isProducer, isVocal } from "../../utils/common/checkRoleType";

export default function ProfilImageContainer() {
  const userType = useRecoilValue(signupRole);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const { checkImageSize, checkImageType, getFileSize, getFileURL } = useUploadImageFile();
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isHover, setIsHover] = useState(false);

  function handleImageHover() {
    setIsHover(!isHover);
  }

  function checkImageHover() {
    return imageSrc && isHover;
  }

  function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
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

  return (
    <>
      {/* 프로듀서 프로필 이미지 업로드 */}
      {isProducer(userType) && (
        <ImageContainer>
          <ImageUploadBox onMouseEnter={handleImageHover} onMouseLeave={handleImageHover}>
            {imageSrc ? (
              <ProducerImageWrapper>
                <ProducerImage src={imageSrc} alt="프로듀서 프로필 이미지 미리보기" />
              </ProducerImageWrapper>
            ) : (
              <SignUpUploadImageWrapper>
                <SignUpUploadImageProducerIcon />
              </SignUpUploadImageWrapper>
            )}
            {/* {checkImageHover() && <SignUpChangeProducerImageIcon />} */}
            <ImageInput type="file" accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG" onChange={handleUploadImage} />
          </ImageUploadBox>
        </ImageContainer>
      )}

      {/* 보컬 프로필 이미지 업로드 */}
      {isVocal(userType) && (
        <ImageContainer>
          <ImageUploadBox onMouseEnter={handleImageHover} onMouseLeave={handleImageHover}>
            {imageSrc ? (
              <VocalImageWrapper>
                <VocalImage src={imageSrc} alt="보컬 프로필 이미지 미리보기" />
              </VocalImageWrapper>
            ) : (
              <SignUpUploadImageWrapper>
                <SignUpUploadImageVocalIcon />
              </SignUpUploadImageWrapper>
            )}
            {/* {checkImageHover() && <SignUpChangeVocalImageIcon />} */}
            <ImageInput type="file" accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG" onChange={handleUploadImage} />
          </ImageUploadBox>
        </ImageContainer>
      )}
    </>
  );
}

const ImageInput = styled.input`
  display: none;
`;

const ImageUploadBox = styled.label`
  cursor: pointer;
`;

const ImageContainer = styled.section`
  margin: 6.4rem 28.1rem 4.1rem 28.1rem;
  width: 21.7rem;
  height: 21.7rem;
`;

const ProducerImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 21.7rem;
  height: 21.7rem;

  border-radius: 25rem;

  position: absolute;
  overflow: hidden;
`;

const VocalImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 16.4rem;
  height: 16.4rem;

  border-radius: 1.8rem;

  position: absolute;
  overflow: hidden;

  transform: rotate(-45deg);
  right: 30.16rem;
  top: 18.45rem;
`;

const ProducerImage = styled.img`
  width: 100%;
  height: 100%;

  position: absolute;
  transform: translate(50, 50);

  object-fit: cover;
  margin: auto;

  &:hover {
    backdrop-filter: blur(1.7rem);
  }
`;

const VocalImage = styled.img`
  width: 150%;
  height: 135%;

  position: absolute;
  transform: translate(50, 50);

  object-fit: cover;
  margin: auto;

  transform: rotate(45deg);
`;

const SignUpChangeProducerImageIcon = styled(SignUpChangeImageProducerIc)`
  width: 21.7rem;
  height: 21.7rem;

  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;

  position: relative;

  backdrop-filter: blur(1.7rem);
`;

const SignUpChangeVocalImageIcon = styled(SignUpChangeImageVocalIc)`
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

const SignUpUploadImageProducerIcon = styled(SignUpUploadImageProducerIc)`
  width: 21.7rem;
  height: 21.7rem;
`;

const SignUpUploadImageVocalIcon = styled(SignUpUploadImageVocalIc)`
  width: 21.7rem;
  height: 21.7rem;
`;
