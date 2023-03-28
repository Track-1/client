import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ProfileEditCheckIc, ProfileEditWarningIc } from "../../assets";
import profileEditUploadDefaultImg from "../../assets/image/profileEditUploadDefaultImg.png";
import { getProducerPortfolio } from "../../core/api/producerProfile";
import { nickName } from "../../type/editDataType";
interface PropsType {
  profileImage: File;
  name: string;
  updateProfileImage: (imgFile: File) => void;
  updateName: (name: string) => void;
}

export default function ProducerProfileEditTitle(props: PropsType) {
  const NICK_NAME = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/;
  const { profileImage, name, updateProfileImage, updateName } = props;
  const [showImage, setShowImage] = useState<string | ArrayBuffer>();
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [nameState, setNameState] = useState<nickName>(nickName.NOTHING);

  function getImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFiles = e.target.files as FileList;
    updateProfileImage(imageFiles[0]);
    showPrevImage(imageFiles);
    setIsImageUploaded(true);
  }

  function showPrevImage(imageFiles: FileList) {
    const reader = new FileReader();
    reader.readAsDataURL(imageFiles[0]);
    reader.onloadend = () => {
      const resultImage = reader.result;
      resultImage && setShowImage(resultImage);
    };
  }

  function checkNameInput(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    NICK_NAME.test(text) ? setNameState(nickName.CORRECT) : setNameState(nickName.ERROR);
  }

  return (
    <TitleContainer>
      <ProfileImageContainer htmlFor="profileImg">
        {isImageUploaded ? <ProfileImage src={String(showImage)} /> : <ProfileImage src={String(profileImage)} />}
      </ProfileImageContainer>
      <FileInput type="file" id="profileImg" onChange={getImageFile} />
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper nameState={nameState}>
          <NameInput defaultValue={name} onChange={checkNameInput} />
          {nameState === nickName.CORRECT && <ProfileEditCheckIc />}
          {nameState === nickName.ERROR && <ProfileEditWarningIc />}
        </InputWrapper>
      </NameContainer>
    </TitleContainer>
  );
}

const TitleContainer = styled.section`
  height: 88.8rem;
  width: 67.7rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(#141517, #141517), linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageContainer = styled.label`
  height: 36.8rem;
  width: 36.8rem;

  margin-top: 17.8rem;

  border-radius: 50%;
`;

const ProfileImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  border-radius: 50%;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  border-radius: 50%;
  object-fit: cover;
`;

const NameContainer = styled.article`
  height: 8.8rem;
  width: 60rem;

  margin: 7.6rem 0 0 6.4rem;
`;

const NameTitleWrapper = styled.div`
  display: flex;
`;

const NameTitleText = styled.strong`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.cations}

  margin-right: 0.6rem;
`;

const PointIcon = styled.div`
  height: 0.7rem;
  width: 0.7rem;

  background-color: ${({ theme }) => theme.colors.main};
`;

const InputWrapper = styled.div<{ nameState: nickName }>`
  width: 54.9rem;

  display: flex;
  justify-content: space-between;

  border-bottom: ${({ nameState }) => {
    if (nameState === "nothing") return "0.1rem solid white";
    if (nameState === "correct") return "0.1rem solid #5200FF";
    if (nameState === "error") return "0.1rem solid  #FF4F4F";
  }};
`;

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;
