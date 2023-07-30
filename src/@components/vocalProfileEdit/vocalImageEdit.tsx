import { useState } from "react";
import styled from "styled-components";

import { ChangePhotoIc } from "../../assets";
import useImagePreview from "../../hooks/common/useShowImage";

export default function VocalImageEdit() {
  const [image, setImage] = useState<File | Blob | undefined | null>(undefined);
  const showImage = useImagePreview(image);

  function getImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];
    setImage(file);
  }

  return (
    <>
      {/* 프로듀서 프로필 이미지 업로더 */}
      <ProfileImageContainer>
        {/* 사용자가 넣은 이미지 or 기본 사람 이미지 */}
        {/* {isImageUploaded ? <ProfileImage src={String(showImage)} /> : <ProfileImage src={String(profileImage)} />} */}
        <ImageWrapper>
          <ProfileImage src={String(showImage)} />
        </ImageWrapper>
        <ChangePhotoIcon />
        <FileInput type="file" onChange={getImageFile} />
      </ProfileImageContainer>
    </>
  );
}

const ChangePhotoIcon = styled(ChangePhotoIc)`
  width: 36.8rem;
  height: 36.8rem;

  display: none;
  position: absolute;

  pointer-events: none;
`;

const ProfileImageContainer = styled.label`
  display: flex;
  position: relative;

  width: 36.8rem;
  height: 36.8rem;

  margin-top: 17.8rem;

  align-items: center;
  justify-content: center;

  overflow: hidden;
  cursor: pointer;

  :hover ${ChangePhotoIcon} {
    display: block;
  }
`;

const ImageWrapper = styled.div`
 height: 26.7em;
  width: 26.7em;

  margin-left: 5rem;
  margin-top: 15rem;
  margin-bottom: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  //  position: absolute;

  border-radius: 3rem;
  overflow: hidden;

  transform: rotate(-45deg);
  -ms-transform: rotate(-45deg); /* IE 9 */
  -webkit-transform: rotate(-45deg); /* Chrome, Safari, Opera */
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  margin: auto;


  /* transform: rotate(-45deg); */

  /* transform: translate(50, 50); */
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;
