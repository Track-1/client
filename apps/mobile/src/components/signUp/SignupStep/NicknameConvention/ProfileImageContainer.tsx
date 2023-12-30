import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { SignUpUploadImageProducerIc, SignUpUploadImageVocalIc, SignupChangePhotoIc } from '../../../../assets';
import useUploadImageFile from '../../../../hooks/common/useUploadImageFile';
import { role } from '../../../../recoil/common/role';
import { joinUserData } from '../../../../recoil/signUp/joinUserData';
import { JoinUserDataPropsType } from '../../../../type/signUp/joinUserDataType';
import { isProducer, isVocal } from '../../../../utils/common/check';

export default function ProfilImageContainer() {
  const userType = useRecoilValue(role);
  const [userData, setUserData] = useRecoilState<JoinUserDataPropsType>(joinUserData);
  const { checkImageSize, checkImageType, getFileSize, getFileURL } = useUploadImageFile();
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isHover, setIsHover] = useState(false);

  function handleImageHover(isHoverValue: boolean) {
    setIsHover(isHoverValue);
  }

  function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const fileTypeSplit = e.target.value.split('.');
    const fileType = fileTypeSplit.length > 0 && fileTypeSplit[fileTypeSplit.length - 1];

    if (e.target.files?.length === 0) {
    } else {
      if (checkImageType('.' + fileType) && e.target.files) {
        const file = e.target.files[0];
        if (file) {
          const fileUrl: string = getFileURL(file);
          const imageSize: number = getFileSize(file);
          if (e.target.files[0] && checkImageSize(imageSize)) {
            setImageSrc(fileUrl);
            setUserData({ ...userData, userImageFile: file });
          }
        }
      }
    }
  }

  return (
    <>
      {/* 프로듀서 프로필 이미지 업로드 */}
      {isProducer(userType) && (
        <Styled.ImageContainer>
          <Styled.ImageUploadBox
            onMouseEnter={() => handleImageHover(true)}
            onMouseLeave={() => handleImageHover(false)}>
            {imageSrc ? (
              <Styled.ProducerImageWrapper>
                <Styled.ProducerImage src={imageSrc} alt="프로듀서 프로필 이미지 미리보기" className="profile-image" />
                <Styled.SignupChangePhotoProducerIcon className="change-photo-ic" />
              </Styled.ProducerImageWrapper>
            ) : (
              <Styled.SignUpUploadImageWrapper>
                <Styled.SignUpUploadImageProducerIcon />
              </Styled.SignUpUploadImageWrapper>
            )}
            <Styled.ImageInput type="file" accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG" onChange={handleUploadImage} />
          </Styled.ImageUploadBox>
        </Styled.ImageContainer>
      )}

      {/* 보컬 프로필 이미지 업로드 */}
      {isVocal(userType) && (
        <Styled.ImageContainer>
          <Styled.ImageUploadBox
            onMouseEnter={() => handleImageHover(true)}
            onMouseLeave={() => handleImageHover(false)}>
            {imageSrc ? (
              <Styled.VocalImageWrapper>
                <Styled.VocalImage src={imageSrc} alt="보컬 프로필 이미지 미리보기" className="profile-image" />
                <Styled.SignupChangePhotoVocalIcon className="change-photo-ic" />
              </Styled.VocalImageWrapper>
            ) : (
              <Styled.SignUpUploadImageWrapper>
                <Styled.SignUpUploadImageVocalIcon />
              </Styled.SignUpUploadImageWrapper>
            )}
            <Styled.ImageInput type="file" accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG" onChange={handleUploadImage} />
          </Styled.ImageUploadBox>
        </Styled.ImageContainer>
      )}
    </>
  );
}

const Styled = {
  ImageInput: styled.input`
    display: none;
  `,

  ImageUploadBox: styled.label`
    cursor: pointer;

    &:hover {
      .change-photo-ic {
        display: block;
      }

      .profile-image {
        filter: blur(1.7rem);
      }
    }
  `,

  ImageContainer: styled.section`
    width: 22.7rem;
    height: 22.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  ProducerImageWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 22.7rem;
    height: 22.7rem;

    border-radius: 25rem;

    position: sticky;
    overflow: hidden;
  `,

  VocalImageWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 16.4rem;
    height: 16.4rem;

    border-radius: 1.8rem;

    position: sticky;
    overflow: hidden;

    transform: rotate(-45deg);
    right: 13rem;
    top: 2.7rem;
  `,

  ProducerImage: styled.img`
    width: 100%;
    height: 100%;

    position: absolute;
    transform: translate(50, 50);

    object-fit: cover;
    margin: auto;
  `,

  VocalImage: styled.img`
    width: 150%;
    height: 135%;

    position: absolute;
    transform: translate(50, 50);

    object-fit: cover;
    margin: auto;

    transform: rotate(45deg);
  `,

  SignUpUploadImageWrapper: styled.div`
    position: sticky;
  `,

  SignUpUploadImageProducerIcon: styled(SignUpUploadImageProducerIc)`
    width: 22.7rem;
    height: 22.7rem;
  `,

  SignUpUploadImageVocalIcon: styled(SignUpUploadImageVocalIc)`
    width: 22.7rem;
    height: 22.7rem;
  `,

  SignupChangePhotoProducerIcon: styled(SignupChangePhotoIc)`
    width: 11.1rem;
    height: 5.7rem;

    position: relative;
    display: none;
  `,

  SignupChangePhotoVocalIcon: styled(SignupChangePhotoIc)`
    width: 11.1rem;
    height: 5.7rem;
    transform: rotate(45deg);
    position: relative;
    display: none;
  `,
};
