import styled from "styled-components";

import { ChangePhotoIc } from "../../assets";

export default function ProducerImageEdit() {
  return (
    <>
      프로듀서 프로필 이미지 업로더
      <ProfileImageContainer htmlFor="profileImg">
        {/* 사용자가 넣은 이미지 or 기본 사람 이미지 */}
        {/* {isImageUploaded ? <ProfileImage src={String(showImage)} /> : <ProfileImage src={String(profileImage)} />} */}
        <ChangePhotoIcon />
        <FileInput type="file" id="profileImg" />
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
  background-color: wheat;
  width: 36.8rem;
  height: 36.8rem;

  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;

  margin-top: 17.8rem;

  :hover ${ChangePhotoIcon} {
    display: block;
  }
`;
const FileInput = styled.input`
  display: none;
`;
