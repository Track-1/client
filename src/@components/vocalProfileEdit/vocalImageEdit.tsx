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
  width: 26.7em;
  height: 26.7em;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3rem;
  overflow: hidden;

  transform: rotate(-45deg);

  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: white;
    border-radius: 15%;
    z-index: -1;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

const ProfileImage = styled.img`
  margin: auto;

  object-fit: cover;

  transform: rotate(45deg);
  position: absolute;
  width: 141%;
  height: 141%;
`;

const FileInput = styled.input`
  display: none;
`;
