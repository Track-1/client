import styled from "styled-components";

import { ChangePhotoIc } from "../../assets";

export default function ProducerImageEdit() {
  function getImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
  }

  return (
    <>
      {/* 프로듀서 프로필 이미지 업로더 */}
      <ProfileImageContainer>
        {/* 사용자가 넣은 이미지 or 기본 사람 이미지 */}
        {/* {isImageUploaded ? <ProfileImage src={String(showImage)} /> : <ProfileImage src={String(profileImage)} />} */}
        <ProfileImage />
        <ChangePhotoIcon />
        <FileInput type="file" onChange={getImageFile} />{" "}
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

  border-radius: 50%;

  align-items: center;
  justify-content: center;

  overflow: hidden;
  cursor: pointer;

  :hover ${ChangePhotoIcon} {
    display: block;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;

  margin: auto;

  transform: translate(50, 50);
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;
