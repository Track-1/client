import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { ProfileEditCheckIc, ProfileEditWarningIc, SignUpChangeImageIc } from "../../assets";
import profileEditUploadDefaultImg from "../../assets/image/profileEditUploadDefaultImg.png";
import { getProducerPortfolio } from "../../core/api/producerProfile";
import { nickName } from "../../type/editDataType";
import { checkNicknameForm } from "../../utils/errorMessage/checkNicknameForm";
import { checkImageSize, checkImageType, getFileSize, getFileURL } from "../../utils/uploadPage/uploadImage";

interface PropsType {
  profileImage: string;
  name: string;
  updateProfileImage: (imgFile: File) => void;
  updateName: (name: string) => void;
  changeReadyState: (isReady: boolean) => void;
  isImageUploaded: any;
  setIsImageUploaded: any;
}

export default function ProducerProfileEditTitle(props: PropsType) {
  //const NICK_NAME = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/;
  const { profileImage, name, updateProfileImage, updateName, changeReadyState, isImageUploaded, setIsImageUploaded } =
    props;
  const [showImage, setShowImage] = useState<string | ArrayBuffer>();
  // const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [nameState, setNameState] = useState<nickName>(nickName.NOTHING);
  const [isHover, setIsHover] = useState<boolean>(false);

  function getImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    const imageFiles = e.target.files as FileList;
    updateProfileImage(imageFiles[0]);
    showPrevImage(imageFiles);
    setIsImageUploaded(true);
    
    const uploadName = e.target.value.substring(e.target.value.lastIndexOf("\\") + 1);
    if (e.target.files?.length === 0) {
      //alert("사진삽입이 취소되었습니다.")
    } else {
      if(!checkImageType(uploadName)){
        setIsImageUploaded(false);
      }
    }
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
    updateName(text);
    if (checkNicknameForm(text)) {
      setNameState(nickName.CORRECT);
      changeReadyState(true);
      return;
    }
    if (!checkNicknameForm(text)) {
      setNameState(nickName.ERROR);
      changeReadyState(false);
    }
  }

  function trueImageHover() {
    setIsHover(true);
  }

  function falseImageHover() {
    setIsHover(false);
  }

  return (
    <TitleContainer>
      <ProfileImageContainer htmlFor="profileImg" onMouseEnter={trueImageHover} onMouseLeave={falseImageHover}>
        {isImageUploaded ? <ProfileImage src={String(showImage)} /> : <ProfileImage src={String(profileImage)} />}
        {isHover && <SignUpChangeProducerImageIcon />}
      </ProfileImageContainer>
      <FileInput type="file" id="profileImg" onChange={getImageFile} />
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper nameState={nameState}>
          <NameInput defaultValue={name} onChange={checkNameInput}  maxLength={16}/>
          {nameState === nickName.CORRECT && <ProfileEditCheckIc />}
          {nameState === nickName.ERROR && <ProfileEditWarningIc />}
        </InputWrapper>
        {nameState === nickName.ERROR ? (
          <ProfileEditWarningMsg>
            1 to 16 characters(Korean, English), numbers or special characters.
          </ProfileEditWarningMsg>
        ):(
          <BlankMessage></BlankMessage>
        )}
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
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 36.8rem;
  width: 36.8rem;
  border-radius: 50%;
  overflow: hidden;

  margin-top: 17.8rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedImage = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
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

  margin-bottom: 0.5rem;

  border-bottom: ${({ nameState }) => {
    if (nameState === "nothing") return "0.1rem solid white";
    if (nameState === "correct") return "0.1rem solid #5200FF";
    if (nameState === "error") return "0.1rem solid  #FF4F4F";
  }};
`;

const ProfileEditWarningMsg = styled.span`
  width: 100%;
  height: 3rem;
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;

const SignUpChangeProducerImageIcon = styled(SignUpChangeImageIc)`
  height: 36.8rem;
  width: 36.8rem;
  border: 0.1rem solid rgba(30, 32, 37, 0.5);
  border-radius: 25rem;
  position: absolute;

  backdrop-filter: blur(1.7rem);

  cursor: pointer;
`;

const BlankMessage=styled.p`
  width: 100%;
  height: 3rem;

  color:transparent;
  margin-bottom: 2rem;
`