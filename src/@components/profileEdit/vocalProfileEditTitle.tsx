import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  ProfileEditActiveButtonIc,
  ProfileEditCheckIc,
  ProfileEditSleepAcountTextIc,
  ProfileEditSleepAcountTitleIc,
  ProfileEditSleeperButtonIc,
  ProfileEditWarningIc,
  SignUpChangeImgIc,
  SignupVocalProfileImgIc,
} from "../../assets";
import profileEditUploadDefaultImg from "../../assets/image/profileEditUploadDefaultImg.png";
import { getProducerPortfolio } from "../../core/api/producerProfile";
import { nickName } from "../../type/editDataType";
import { isProducer, isVocal } from "../../utils/common/userType";
import { checkNicknameForm } from "../../utils/errorMessage/checkNicknameForm";

interface PropsType {
  profileImage: any;
  name: string;
  updateProfileImage: (imgFile: File) => void;
  updateName: (name: string) => void;
  changeReadyState: (isReady: boolean) => void;
  isSleep: boolean;
  changeSleepState: () => void;
  isImageUploaded: any;
  setIsImageUploaded: any;
}

export default function ProducerProfileEditTitle(props: PropsType) {
  //const NICK_NAME = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/;
  const {
    profileImage,
    name,
    updateProfileImage,
    updateName,
    changeReadyState,
    isSleep,
    changeSleepState,
    isImageUploaded,
    setIsImageUploaded,
  } = props;
  const [showImage, setShowImage] = useState<string | ArrayBuffer>();
  // const [isImageUploaded, setIsImageUploaded] = useState<boolean>(false);
  const [nameState, setNameState] = useState<nickName>(nickName.NOTHING);
  const [isHover, setIsHover] = useState<boolean>(false);

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
        <ImageWrapper>
          {isImageUploaded ? <UploadedImage src={String(showImage)} /> : <ProfileImage src={profileImage} />}
        </ImageWrapper>
        {isHover && <SignUpChangeVocalImageIcon />}
      </ProfileImageContainer>
      
      <FileInput
        type="file"
        id="profileImg"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png, .JPG, .JPEG, .PNG"
        onChange={getImageFile}
      />

      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper nameState={nameState}>
          <NameInput defaultValue={name} onChange={checkNameInput} />
          {nameState === nickName.CORRECT && <ProfileEditCheckIcon />}
          {nameState === nickName.ERROR && <ProfileEditWarningIcon />}
        </InputWrapper>
        {nameState === nickName.ERROR ? (
          <VocalEditWarningMsg>
            1 to 16 characters(Korean, English), numbers or special characters.
          </VocalEditWarningMsg>
        ):(
          <BlankMessage></BlankMessage>
        )}
      </NameContainer>
      <SleepAcountContainer>
        <SleepAcountTextWrapper>
          <ProfileEditSleepAcountTitleIcon />
          <ProfileEditSleepAcountTextIcon />
        </SleepAcountTextWrapper>
        {isSleep ? (
          <ProfileEditSleeperButtonIcon onClick={changeSleepState} />
        ) : (
          <ProfileEditActiveButtonIcon onClick={changeSleepState} />
        )}
      </SleepAcountContainer>
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
`;

const ProfileImage = styled.img`
  width: 150%;
  height: 150%;
  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  transform: rotate(45deg);

  :hover {
    filter: blur(3rem);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedImage = styled.img`
  width: 150%;
  height: 150%;
  position: absolute;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;

  transform: rotate(45deg);
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

const VocalEditWarningMsg = styled.span`
  width: 100%;
  height: 3rem;
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;

const BlankMessage=styled.p`
  width: 100%;
  height: 3rem;

  color:transparent;
  margin-bottom: 2rem;
`

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;

const SleepAcountContainer = styled.section`
  display: flex;
  justify-content: space-between;

  width: 54.9rem;
`;
const SleepAcountTextWrapper = styled.div`
  display: flex;
  flex-direction: column;

  height: 12rem;
  margin-top: 7rem;
`;

const ProfileEditSleepAcountTextIcon = styled(ProfileEditSleepAcountTextIc)`
  width: 25rem;

  margin-top: 2.2rem;
`;

const ProfileEditActiveButtonIcon = styled(ProfileEditActiveButtonIc)`
  width: 19.2rem;
  margin-top: 12.5rem;
  margin-bottom: 8rem;
`;

const ProfileEditSleeperButtonIcon = styled(ProfileEditSleeperButtonIc)`
  width: 19.2rem;
  margin-top: 12.5rem;
  margin-bottom: 8rem;
`;

const ProfileEditWarningIcon = styled(ProfileEditWarningIc)`
  width: 4rem;
  height: 4rem;
`;

const ProfileEditCheckIcon = styled(ProfileEditCheckIc)`
  width: 4rem;
  height: 4rem;
`;

const ProfileEditSleepAcountTitleIcon = styled(ProfileEditSleepAcountTitleIc)`
  width: 22rem;
`;

const SignUpChangeVocalImageIcon = styled(SignUpChangeImgIc)`
  height: 26.9rem;
  width: 26.9rem;

  border-radius: 3rem;

  backdrop-filter: blur(1.7rem);
  transform: rotate(45deg);
  position: absolute;

  margin-top: -31.8rem;
  margin-left: 5rem;

  cursor: pointer;
`;
